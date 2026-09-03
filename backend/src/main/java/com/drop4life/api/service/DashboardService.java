package com.drop4life.api.service;

import com.drop4life.api.dto.response.DashboardStatsResponse;
import com.drop4life.api.enums.DonationStatus;
import com.drop4life.api.enums.RequestStatus;
import com.drop4life.api.enums.UrgencyLevel;
import com.drop4life.api.enums.UserRole;
import com.drop4life.api.repository.BloodRequestRepository;
import com.drop4life.api.repository.DonationRepository;
import com.drop4life.api.repository.HospitalRepository;
import com.drop4life.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final BloodRequestRepository bloodRequestRepository;
    private final DonationRepository donationRepository;
    private final HospitalRepository hospitalRepository;

    public DashboardStatsResponse getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalDonors = userRepository.countByRole(UserRole.DONOR);
        long activeDonors = userRepository.countByRoleAndIsAvailableTrue(UserRole.DONOR);
        long totalBloodRequests = bloodRequestRepository.count();
        long activeBloodRequests = bloodRequestRepository.countByStatus(RequestStatus.ACTIVE);
        long criticalBloodRequests = bloodRequestRepository.countByStatusAndUrgencyLevel(RequestStatus.ACTIVE, UrgencyLevel.CRITICAL);
        long totalDonations = donationRepository.count();
        long completedDonations = donationRepository.countByStatus(DonationStatus.COMPLETED);
        long totalHospitals = hospitalRepository.count();

        // Requests grouped by blood group
        List<Object[]> groupCounts = bloodRequestRepository.countByBloodGroupAndStatus(RequestStatus.ACTIVE);
        Map<String, Long> requestsByBloodGroup = new HashMap<>();
        for (Object[] row : groupCounts) {
            requestsByBloodGroup.put(row[0].toString(), (Long) row[1]);
        }

        return DashboardStatsResponse.builder()
                .totalUsers(totalUsers)
                .totalDonors(totalDonors)
                .activeDonors(activeDonors)
                .totalBloodRequests(totalBloodRequests)
                .activeBloodRequests(activeBloodRequests)
                .criticalBloodRequests(criticalBloodRequests)
                .totalDonations(totalDonations)
                .completedDonations(completedDonations)
                .totalHospitals(totalHospitals)
                .responseRate(98.5)
                .averageResponseTime("4.2 min")
                .requestsByBloodGroup(requestsByBloodGroup)
                .build();
    }
}
