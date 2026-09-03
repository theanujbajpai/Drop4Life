package com.drop4life.api.dto.request;

import com.drop4life.api.enums.BloodGroup;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class DonationCreateDto {
    private UUID donorId;
    private UUID requestId;

    @NotNull(message = "Blood group is required")
    private BloodGroup bloodGroup;

    @Min(value = 1, message = "At least 1 unit")
    @Builder.Default
    private Integer unitsDonated = 1;

    @NotNull(message = "Donation date is required")
    private LocalDateTime donationDate;

    @NotBlank(message = "Hospital name is required")
    private String hospitalName;

    private String hospitalAddress;
    private String notes;
}
