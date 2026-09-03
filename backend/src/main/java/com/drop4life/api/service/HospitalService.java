package com.drop4life.api.service;

import com.drop4life.api.dto.response.HospitalDto;
import com.drop4life.api.entity.BloodInventory;
import com.drop4life.api.entity.Hospital;
import com.drop4life.api.repository.BloodInventoryRepository;
import com.drop4life.api.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final BloodInventoryRepository bloodInventoryRepository;

    public List<HospitalDto> getHospitals(String city) {
        List<Hospital> hospitals = (city != null && !city.isBlank())
                ? hospitalRepository.findByCity(city)
                : hospitalRepository.findAll();

        return hospitals.stream().map(this::toDto).collect(Collectors.toList());
    }

    public HospitalDto getHospitalById(UUID id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + id));
        return toDto(hospital);
    }

    private HospitalDto toDto(Hospital h) {
        List<BloodInventory> inventory = bloodInventoryRepository.findByHospitalId(h.getId());
        List<HospitalDto.BloodInventoryItemDto> inventoryItems = inventory.stream()
                .map(i -> HospitalDto.BloodInventoryItemDto.builder()
                        .bloodGroup(i.getBloodGroup().getDisplayName())
                        .unitsAvailable(i.getUnitsAvailable())
                        .build())
                .collect(Collectors.toList());

        return HospitalDto.builder()
                .id(h.getId())
                .name(h.getName())
                .address(h.getAddress())
                .city(h.getCity())
                .state(h.getState())
                .pincode(h.getPincode())
                .phone(h.getPhone())
                .email(h.getEmail())
                .website(h.getWebsite())
                .licenseNumber(h.getLicenseNumber())
                .bloodBankAvailable(h.getBloodBankAvailable())
                .emergencyContact(h.getEmergencyContact())
                .latitude(h.getLatitude())
                .longitude(h.getLongitude())
                .isVerified(h.getIsVerified())
                .inventory(inventoryItems)
                .build();
    }
}
