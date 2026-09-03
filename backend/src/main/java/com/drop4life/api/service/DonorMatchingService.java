package com.drop4life.api.service;

import com.drop4life.api.dto.response.DonorMatchResponse;
import com.drop4life.api.entity.User;
import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UserRole;
import com.drop4life.api.repository.UserRepository;
import com.drop4life.api.util.BloodCompatibilityUtil;
import com.drop4life.api.util.DistanceCalculator;
import com.drop4life.api.util.ValidationConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonorMatchingService {

    private final UserRepository userRepository;

    public List<DonorMatchResponse> findMatchedDonors(
            BloodGroup neededBloodGroup,
            Double targetLat,
            Double targetLng,
            String city,
            Double maxRadiusKm
    ) {
        List<BloodGroup> compatibleGroups = BloodCompatibilityUtil.getCompatibleDonorsForRecipient(neededBloodGroup);
        List<User> candidateDonors = userRepository.findAvailableDonorsByBloodGroups(UserRole.DONOR, compatibleGroups);

        double effectiveMaxRadius = (maxRadiusKm != null && maxRadiusKm > 0) ? maxRadiusKm : 50.0;

        List<DonorMatchResponse> scoredDonors = new ArrayList<>();

        for (User donor : candidateDonors) {
            // Check last donation cooldown
            if (donor.getLastDonationDate() != null) {
                long daysSinceDonation = ChronoUnit.DAYS.between(donor.getLastDonationDate(), LocalDate.now());
                int cooldownDays = "female".equalsIgnoreCase(donor.getGender())
                        ? ValidationConstants.FEMALE_DONATION_COOLDOWN_DAYS
                        : ValidationConstants.MALE_DONATION_COOLDOWN_DAYS;

                if (daysSinceDonation < cooldownDays) {
                    continue; // Ineligible due to cooldown
                }
            }

            double distanceKm = DistanceCalculator.calculateDistanceKm(
                    targetLat, targetLng, donor.getLatitude(), donor.getLongitude()
            );

            // If coordinates were provided and distance exceeds radius, check if same city allows fallback
            if (targetLat != null && targetLng != null && distanceKm > effectiveMaxRadius) {
                if (city == null || donor.getCity() == null || !city.equalsIgnoreCase(donor.getCity())) {
                    continue;
                }
            }

            int tier = DistanceCalculator.getDistanceTier(distanceKm);
            double score = calculateMatchScore(neededBloodGroup, donor, distanceKm);

            scoredDonors.add(DonorMatchResponse.builder()
                    .id(donor.getId())
                    .fullName(donor.getFullName())
                    .bloodGroup(donor.getBloodGroup())
                    .city(donor.getCity())
                    .state(donor.getState())
                    .distanceKm(distanceKm)
                    .distanceTier(tier)
                    .matchScore(score)
                    .isAvailable(donor.getIsAvailable())
                    .lastDonationDate(donor.getLastDonationDate())
                    .isVerified(donor.getIsVerified())
                    .build());
        }

        // Sort by match score descending, then by distance ascending
        scoredDonors.sort((a, b) -> {
            int scoreCompare = Double.compare(b.getMatchScore(), a.getMatchScore());
            if (scoreCompare != 0) return scoreCompare;
            return Double.compare(a.getDistanceKm(), b.getDistanceKm());
        });

        // Auto-expand check: If we have less than 3 donors, don't restrict to tight radius
        return scoredDonors;
    }

    private double calculateMatchScore(BloodGroup neededBloodGroup, User donor, double distanceKm) {
        double score = 0;

        // 1. Blood Compatibility (up to 40 points)
        if (donor.getBloodGroup() == neededBloodGroup) {
            score += 40.0; // Exact match
        } else if (BloodCompatibilityUtil.isCompatible(donor.getBloodGroup(), neededBloodGroup)) {
            score += 30.0; // Compatible match
        }

        // 2. Distance Score (up to 30 points)
        if (distanceKm <= 5.0) {
            score += 30.0;
        } else if (distanceKm <= 15.0) {
            score += 22.0;
        } else if (distanceKm <= 30.0) {
            score += 15.0;
        } else if (distanceKm <= 50.0) {
            score += 8.0;
        } else {
            score += 3.0;
        }

        // 3. Cooldown & Experience (up to 20 points)
        if (donor.getLastDonationDate() == null) {
            score += 15.0; // First time donor
        } else {
            long daysSince = ChronoUnit.DAYS.between(donor.getLastDonationDate(), LocalDate.now());
            if (daysSince >= 180) {
                score += 20.0; // Seasoned donor ready to donate
            } else if (daysSince >= 90) {
                score += 15.0;
            }
        }

        // 4. Verification bonus (10 points)
        if (Boolean.TRUE.equals(donor.getIsVerified())) {
            score += 10.0;
        }

        return Math.min(100.0, score);
    }
}
