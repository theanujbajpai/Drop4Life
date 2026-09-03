package com.drop4life.api.dto.request;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UrgencyLevel;
import com.drop4life.api.util.ValidationConstants;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BloodRequestCreateDto {

    @NotBlank(message = "Patient name is required")
    @Size(min = 2, max = 100, message = "Patient name must be between 2 and 100 characters")
    private String patientName;

    @NotNull(message = "Blood group is required")
    private BloodGroup bloodGroup;

    @NotNull(message = "Units needed is required")
    @Min(value = 1, message = "Units needed must be at least 1")
    @Max(value = 20, message = "Cannot request more than 20 units at once")
    private Integer unitsNeeded;

    @NotNull(message = "Urgency level is required")
    private UrgencyLevel urgencyLevel;

    @NotBlank(message = "Hospital name is required")
    private String hospitalName;

    @NotBlank(message = "Hospital address is required")
    private String hospitalAddress;

    private String hospitalPhone;

    @NotBlank(message = "City is required")
    private String city;

    @Pattern(regexp = ValidationConstants.PINCODE_REGEX, message = "Pincode must be 6 digits")
    private String pincode;

    @NotNull(message = "Required by date is required")
    @Future(message = "Required date must be in the future")
    private LocalDateTime requiredByDate;

    private String description;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = ValidationConstants.PHONE_REGEX, message = "Enter a valid 10-digit Indian phone number")
    private String contactNumber;

    @NotBlank(message = "Reason for blood request is required")
    private String reason;

    private Double latitude;
    private Double longitude;
}
