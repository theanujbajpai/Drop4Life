package com.drop4life.api.dto.response;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class HospitalDto {
    private UUID id;
    private String name;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String phone;
    private String email;
    private String website;
    private String licenseNumber;
    private Boolean bloodBankAvailable;
    private String emergencyContact;
    private Double latitude;
    private Double longitude;
    private Boolean isVerified;
    private List<BloodInventoryItemDto> inventory;

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    @Builder
    public static class BloodInventoryItemDto {
        private String bloodGroup;
        private Integer unitsAvailable;
    }
}
