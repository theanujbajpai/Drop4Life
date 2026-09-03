package com.drop4life.api.dto.response;

import com.drop4life.api.enums.BloodGroup;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class DonorMatchResponse {
    private UUID id;
    private String fullName;
    private BloodGroup bloodGroup;
    private String city;
    private String state;
    private Double distanceKm;
    private int distanceTier;
    private double matchScore; // Calculated 0 - 100
    private Boolean isAvailable;
    private LocalDate lastDonationDate;
    private Boolean isVerified;
    private String responseStatus; // PENDING, ACCEPTED, DECLINED if part of a request
}
