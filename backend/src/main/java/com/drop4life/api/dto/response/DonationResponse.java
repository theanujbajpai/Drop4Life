package com.drop4life.api.dto.response;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.DonationStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class DonationResponse {
    private UUID id;
    private UUID donorId;
    private String donorName;
    private UUID requestId;
    private BloodGroup bloodGroup;
    private Integer unitsDonated;
    private LocalDateTime donationDate;
    private String hospitalName;
    private String hospitalAddress;
    private DonationStatus status;
    private String notes;
    private LocalDateTime createdAt;
}
