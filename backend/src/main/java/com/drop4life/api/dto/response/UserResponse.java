package com.drop4life.api.dto.response;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UserRole;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class UserResponse {
    private UUID id;
    private String email;
    private String fullName;
    private String phone;
    private LocalDate dateOfBirth;
    private String gender;
    private BloodGroup bloodGroup;
    private UserRole role;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String country;
    private Double latitude;
    private Double longitude;
    private Boolean isVerified;
    private Boolean isAvailable;
    private LocalDate lastDonationDate;
    private Double weight;
    private String medicalConditions;
    private String organizationName;
    private String licenseNumber;
    private LocalDateTime createdAt;
}
