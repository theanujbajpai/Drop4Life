package com.drop4life.api.service;

import com.drop4life.api.dto.request.BloodRequestCreateDto;
import com.drop4life.api.dto.response.BloodRequestResponse;
import com.drop4life.api.dto.response.DonorMatchResponse;
import com.drop4life.api.entity.BloodRequest;
import com.drop4life.api.entity.DonorResponse;
import com.drop4life.api.entity.User;
import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.DonorResponseStatus;
import com.drop4life.api.enums.RequestStatus;
import com.drop4life.api.enums.UrgencyLevel;
import com.drop4life.api.exception.BadRequestException;
import com.drop4life.api.exception.ResourceNotFoundException;
import com.drop4life.api.repository.BloodRequestRepository;
import com.drop4life.api.repository.DonorResponseRepository;
import com.drop4life.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;
    private final UserRepository userRepository;
    private final DonorResponseRepository donorResponseRepository;
    private final DonorMatchingService donorMatchingService;
    private final NotificationService notificationService;
    private final AuditService auditService;

    @Transactional
    public BloodRequestResponse createBloodRequest(UUID requesterId, BloodRequestCreateDto dto) {
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + requesterId));

        // Anti-spam check: prevent duplicate requests for the same patient in the last 10 minutes
        LocalDateTime tenMinutesAgo = LocalDateTime.now().minusMinutes(10);
        List<BloodRequest> recent = bloodRequestRepository.findRecentByRequester(
                RequestStatus.ACTIVE, requesterId, tenMinutesAgo
        );
        for (BloodRequest br : recent) {
            if (br.getPatientName().equalsIgnoreCase(dto.getPatientName()) &&
                br.getBloodGroup() == dto.getBloodGroup()) {
                throw new BadRequestException("A blood request for patient '" + dto.getPatientName() +
                        "' with blood group " + dto.getBloodGroup().getDisplayName() +
                        " was already created recently. Please wait before posting again.");
            }
        }

        BloodRequest bloodRequest = BloodRequest.builder()
                .requester(requester)
                .patientName(dto.getPatientName())
                .bloodGroup(dto.getBloodGroup())
                .unitsNeeded(dto.getUnitsNeeded())
                .urgencyLevel(dto.getUrgencyLevel())
                .hospitalName(dto.getHospitalName())
                .hospitalAddress(dto.getHospitalAddress())
                .hospitalPhone(dto.getHospitalPhone())
                .city(dto.getCity())
                .pincode(dto.getPincode())
                .requiredByDate(dto.getRequiredByDate())
                .description(dto.getDescription())
                .contactNumber(dto.getContactNumber())
                .reason(dto.getReason())
                .status(RequestStatus.ACTIVE)
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .unitsSecured(0)
                .build();

        BloodRequest saved = bloodRequestRepository.save(bloodRequest);

        // Find compatible donors to notify
        List<DonorMatchResponse> matchedDonors = donorMatchingService.findMatchedDonors(
                saved.getBloodGroup(),
                saved.getLatitude(),
                saved.getLongitude(),
                saved.getCity(),
                50.0
        );

        int notifiedCount = 0;
        for (DonorMatchResponse match : matchedDonors) {
            User donor = userRepository.findById(match.getId()).orElse(null);
            if (donor != null) {
                // Record donor response entry
                DonorResponse donorResponse = DonorResponse.builder()
                        .donor(donor)
                        .bloodRequest(saved)
                        .status(DonorResponseStatus.PENDING)
                        .distanceKm(match.getDistanceKm())
                        .matchScore(match.getMatchScore())
                        .build();
                donorResponseRepository.save(donorResponse);

                // Push real-time notification
                String urgencyPrefix = saved.getUrgencyLevel() == UrgencyLevel.CRITICAL ? "🚨 EMERGENCY: " : "🩸 ";
                notificationService.sendNotification(
                        donor.getId(),
                        urgencyPrefix + saved.getBloodGroup().getDisplayName() + " Blood Needed Urgently!",
                        saved.getPatientName() + " needs " + saved.getUnitsNeeded() + " units of " +
                                saved.getBloodGroup().getDisplayName() + " at " + saved.getHospitalName() +
                                " (" + saved.getCity() + "). Distance: " + match.getDistanceKm() + " km.",
                        "blood_request",
                        saved.getId()
                );
                notifiedCount++;
            }
        }

        saved.setDonorsNotified(notifiedCount);
        bloodRequestRepository.save(saved);

        auditService.log(requesterId, "CREATE_BLOOD_REQUEST", "BLOOD_REQUEST", saved.getId(),
                "Created request for " + saved.getBloodGroup().getDisplayName() + ", notified " + notifiedCount + " donors", null);

        return toResponse(saved);
    }

    public List<BloodRequestResponse> getActiveRequests(BloodGroup bloodGroup, UrgencyLevel urgency, String city) {
        List<BloodRequest> requests = bloodRequestRepository.findByStatusOrderByCreatedAtDesc(RequestStatus.ACTIVE);

        return requests.stream()
                .filter(r -> bloodGroup == null || r.getBloodGroup() == bloodGroup)
                .filter(r -> urgency == null || r.getUrgencyLevel() == urgency)
                .filter(r -> city == null || (r.getCity() != null && r.getCity().toLowerCase().contains(city.toLowerCase())))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public BloodRequestResponse getRequestById(UUID id) {
        BloodRequest br = bloodRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blood request not found: " + id));
        return toResponse(br);
    }

    public List<BloodRequestResponse> getRequestsByRequester(UUID requesterId) {
        return bloodRequestRepository.findByRequesterIdOrderByCreatedAtDesc(requesterId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public BloodRequestResponse respondToRequest(UUID requestId, UUID donorId, boolean accepted) {
        BloodRequest request = bloodRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Blood request not found: " + requestId));

        User donor = userRepository.findById(donorId)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found: " + donorId));

        DonorResponse donorResponse = donorResponseRepository.findByDonorIdAndBloodRequestId(donorId, requestId)
                .orElse(DonorResponse.builder()
                        .donor(donor)
                        .bloodRequest(request)
                        .build());

        donorResponse.setStatus(accepted ? DonorResponseStatus.ACCEPTED : DonorResponseStatus.DECLINED);
        donorResponse.setRespondedAt(LocalDateTime.now());
        donorResponseRepository.save(donorResponse);

        // Update counts
        long respondedCount = donorResponseRepository.countByBloodRequestIdAndStatus(requestId, DonorResponseStatus.ACCEPTED) +
                              donorResponseRepository.countByBloodRequestIdAndStatus(requestId, DonorResponseStatus.DECLINED);
        request.setDonorsResponded((int) respondedCount);
        bloodRequestRepository.save(request);

        // Notify the requester
        String action = accepted ? "ACCEPTED" : "DECLINED";
        notificationService.sendNotification(
                request.getRequester().getId(),
                "Donor " + action + " Blood Request",
                donor.getFullName() + " (" + donor.getBloodGroup().getDisplayName() + ") has " +
                        action.toLowerCase() + " your request for " + request.getPatientName() + ".",
                "blood_request_response",
                requestId
        );

        auditService.log(donorId, "RESPOND_BLOOD_REQUEST", "BLOOD_REQUEST", requestId,
                "Donor responded: " + action, null);

        return toResponse(request);
    }

    private BloodRequestResponse toResponse(BloodRequest br) {
        return BloodRequestResponse.builder()
                .id(br.getId())
                .requesterId(br.getRequester().getId())
                .requesterName(br.getRequester().getFullName())
                .requesterPhone(br.getRequester().getPhone())
                .requesterEmail(br.getRequester().getEmail())
                .patientName(br.getPatientName())
                .bloodGroup(br.getBloodGroup())
                .unitsNeeded(br.getUnitsNeeded())
                .urgencyLevel(br.getUrgencyLevel())
                .hospitalName(br.getHospitalName())
                .hospitalAddress(br.getHospitalAddress())
                .hospitalPhone(br.getHospitalPhone())
                .city(br.getCity())
                .pincode(br.getPincode())
                .requiredByDate(br.getRequiredByDate())
                .description(br.getDescription())
                .contactNumber(br.getContactNumber())
                .reason(br.getReason())
                .status(br.getStatus())
                .latitude(br.getLatitude())
                .longitude(br.getLongitude())
                .donorsNotified(br.getDonorsNotified())
                .donorsResponded(br.getDonorsResponded())
                .unitsSecured(br.getUnitsSecured())
                .createdAt(br.getCreatedAt())
                .updatedAt(br.getUpdatedAt())
                .build();
    }
}
