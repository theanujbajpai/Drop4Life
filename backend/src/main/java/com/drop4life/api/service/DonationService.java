package com.drop4life.api.service;

import com.drop4life.api.dto.request.DonationCreateDto;
import com.drop4life.api.dto.response.DonationResponse;
import com.drop4life.api.entity.BloodRequest;
import com.drop4life.api.entity.Donation;
import com.drop4life.api.entity.User;
import com.drop4life.api.enums.DonationStatus;
import com.drop4life.api.exception.ResourceNotFoundException;
import com.drop4life.api.repository.BloodRequestRepository;
import com.drop4life.api.repository.DonationRepository;
import com.drop4life.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final UserRepository userRepository;
    private final BloodRequestRepository bloodRequestRepository;
    private final NotificationService notificationService;
    private final AuditService auditService;

    @Transactional
    public DonationResponse recordDonation(DonationCreateDto dto) {
        User donor = userRepository.findById(dto.getDonorId())
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found: " + dto.getDonorId()));

        BloodRequest request = null;
        if (dto.getRequestId() != null) {
            request = bloodRequestRepository.findById(dto.getRequestId()).orElse(null);
            if (request != null) {
                request.setUnitsSecured(request.getUnitsSecured() + dto.getUnitsDonated());
                bloodRequestRepository.save(request);
            }
        }

        Donation donation = Donation.builder()
                .donor(donor)
                .bloodRequest(request)
                .bloodGroup(dto.getBloodGroup())
                .unitsDonated(dto.getUnitsDonated())
                .donationDate(dto.getDonationDate())
                .hospitalName(dto.getHospitalName())
                .hospitalAddress(dto.getHospitalAddress())
                .status(DonationStatus.COMPLETED)
                .notes(dto.getNotes())
                .build();

        Donation saved = donationRepository.save(donation);

        // Update donor's last donation date
        donor.setLastDonationDate(dto.getDonationDate().toLocalDate());
        userRepository.save(donor);

        notificationService.sendNotification(
                donor.getId(),
                "Thank You for Saving Lives!",
                "Your donation of " + dto.getUnitsDonated() + " unit(s) of " +
                        dto.getBloodGroup().getDisplayName() + " at " + dto.getHospitalName() +
                        " has been verified. You are a hero!",
                "donation_completed",
                saved.getId()
        );

        auditService.log(donor.getId(), "RECORD_DONATION", "DONATION", saved.getId(),
                "Recorded donation of " + dto.getUnitsDonated() + " units", null);

        return toResponse(saved);
    }

    public List<DonationResponse> getDonationsByDonor(UUID donorId) {
        return donationRepository.findByDonorIdOrderByDonationDateDesc(donorId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private DonationResponse toResponse(Donation d) {
        return DonationResponse.builder()
                .id(d.getId())
                .donorId(d.getDonor().getId())
                .donorName(d.getDonor().getFullName())
                .requestId(d.getBloodRequest() != null ? d.getBloodRequest().getId() : null)
                .bloodGroup(d.getBloodGroup())
                .unitsDonated(d.getUnitsDonated())
                .donationDate(d.getDonationDate())
                .hospitalName(d.getHospitalName())
                .hospitalAddress(d.getHospitalAddress())
                .status(d.getStatus())
                .notes(d.getNotes())
                .createdAt(d.getCreatedAt())
                .build();
    }
}
