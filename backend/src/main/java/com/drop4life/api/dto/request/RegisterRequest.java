package com.drop4life.api.dto.request;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UserRole;
import com.drop4life.api.util.ValidationConstants;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = ValidationConstants.PASSWORD_REGEX, 
             message = "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character")
    private String password;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = ValidationConstants.PHONE_REGEX, message = "Enter a valid 10-digit Indian mobile number")
    private String phone;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotNull(message = "Blood group is required")
    private BloodGroup bloodGroup;

    @NotNull(message = "Role is required")
    private UserRole role;

    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(regexp = ValidationConstants.PINCODE_REGEX, message = "Pincode must be exactly 6 digits")
    private String pincode;

    private Double latitude;
    private Double longitude;

    // Donor-specific eligibility
    private Double weight;
    private String medicalConditions;
    private LocalDate lastDonationDate;
    private String emergencyContactName;
    private String emergencyContactPhone;

    // Hospital / Doctor fields
    private String organizationName;
    private String licenseNumber;
}
