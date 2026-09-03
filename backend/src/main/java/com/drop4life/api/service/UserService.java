package com.drop4life.api.service;

import com.drop4life.api.dto.response.UserResponse;
import com.drop4life.api.entity.User;
import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UserRole;
import com.drop4life.api.exception.ResourceNotFoundException;
import com.drop4life.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getUserProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return toResponse(user);
    }

    @Transactional
    public UserResponse updateAvailability(UUID userId, boolean available) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setIsAvailable(available);
        return toResponse(userRepository.save(user));
    }

    public List<UserResponse> getDonors(BloodGroup bloodGroup, String city) {
        List<User> donors = userRepository.findByRole(UserRole.DONOR);

        return donors.stream()
                .filter(d -> bloodGroup == null || d.getBloodGroup() == bloodGroup)
                .filter(d -> city == null || (d.getCity() != null && d.getCity().toLowerCase().contains(city.toLowerCase())))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private UserResponse toResponse(User u) {
        return UserResponse.builder()
                .id(u.getId())
                .email(u.getEmail())
                .fullName(u.getFullName())
                .phone(u.getPhone())
                .dateOfBirth(u.getDateOfBirth())
                .gender(u.getGender())
                .bloodGroup(u.getBloodGroup())
                .role(u.getRole())
                .address(u.getAddress())
                .city(u.getCity())
                .state(u.getState())
                .pincode(u.getPincode())
                .country(u.getCountry())
                .latitude(u.getLatitude())
                .longitude(u.getLongitude())
                .isVerified(u.getIsVerified())
                .isAvailable(u.getIsAvailable())
                .lastDonationDate(u.getLastDonationDate())
                .weight(u.getWeight())
                .medicalConditions(u.getMedicalConditions())
                .organizationName(u.getOrganizationName())
                .licenseNumber(u.getLicenseNumber())
                .createdAt(u.getCreatedAt())
                .build();
    }
}
