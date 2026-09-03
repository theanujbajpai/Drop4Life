package com.drop4life.api.service;

import com.drop4life.api.dto.request.LoginRequest;
import com.drop4life.api.dto.request.RefreshTokenRequest;
import com.drop4life.api.dto.request.RegisterRequest;
import com.drop4life.api.dto.response.AuthResponse;
import com.drop4life.api.entity.RefreshToken;
import com.drop4life.api.entity.User;
import com.drop4life.api.enums.UserRole;
import com.drop4life.api.exception.BadRequestException;
import com.drop4life.api.exception.DuplicateResourceException;
import com.drop4life.api.exception.UnauthorizedException;
import com.drop4life.api.repository.RefreshTokenRepository;
import com.drop4life.api.repository.UserRepository;
import com.drop4life.api.security.JwtTokenProvider;
import com.drop4life.api.util.ValidationConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuditService auditService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().toLowerCase())) {
            throw new DuplicateResourceException("An account with email " + request.getEmail() + " already exists");
        }

        // Validate age for donor (18 to 65 years)
        if (request.getRole() == UserRole.DONOR) {
            int age = Period.between(request.getDateOfBirth(), LocalDate.now()).getYears();
            if (age < ValidationConstants.MIN_DONOR_AGE || age > ValidationConstants.MAX_DONOR_AGE) {
                throw new BadRequestException("Donors must be between " + ValidationConstants.MIN_DONOR_AGE +
                        " and " + ValidationConstants.MAX_DONOR_AGE + " years old. Current age: " + age);
            }
            if (request.getWeight() != null && request.getWeight() < ValidationConstants.MIN_DONOR_WEIGHT_KG) {
                throw new BadRequestException("Minimum body weight for blood donation is " +
                        ValidationConstants.MIN_DONOR_WEIGHT_KG + " kg");
            }
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .bloodGroup(request.getBloodGroup())
                .role(request.getRole())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .country("India")
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .weight(request.getWeight())
                .medicalConditions(request.getMedicalConditions())
                .lastDonationDate(request.getLastDonationDate())
                .emergencyContactName(request.getEmergencyContactName())
                .emergencyContactPhone(request.getEmergencyContactPhone())
                .organizationName(request.getOrganizationName())
                .licenseNumber(request.getLicenseNumber())
                .isVerified(request.getRole() != UserRole.HOSPITAL) // Hospitals require admin verification
                .isAvailable(true)
                .build();

        User savedUser = userRepository.save(user);

        auditService.log(savedUser.getId(), "USER_REGISTER", "USER", savedUser.getId(),
                "Registered with role " + savedUser.getRole(), null);

        String accessToken = jwtTokenProvider.generateToken(savedUser.getId(), savedUser.getEmail(), savedUser.getRole().name());
        RefreshToken refreshToken = createRefreshToken(savedUser);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .expiresIn(jwtTokenProvider.getExpirationMs() / 1000)
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole())
                .bloodGroup(savedUser.getBloodGroup().getDisplayName())
                .build();
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadRequestException("Invalid email or password");
        }

        String accessToken = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole().name());
        RefreshToken refreshToken = createRefreshToken(user);

        auditService.log(user.getId(), "USER_LOGIN", "USER", user.getId(), "User logged in", null);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .expiresIn(jwtTokenProvider.getExpirationMs() / 1000)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .bloodGroup(user.getBloodGroup().getDisplayName())
                .build();
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken token = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));

        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(token);
            throw new BadRequestException("Refresh token has expired, please log in again");
        }

        User user = token.getUser();
        String newAccessToken = jwtTokenProvider.generateToken(user.getId(), user.getEmail(), user.getRole().name());

        // Rotate refresh token
        refreshTokenRepository.delete(token);
        RefreshToken newRefreshToken = createRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken.getToken())
                .tokenType("Bearer")
                .expiresIn(jwtTokenProvider.getExpirationMs() / 1000)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .bloodGroup(user.getBloodGroup().getDisplayName())
                .build();
    }

    @Transactional
    public void logout(UUID userId) {
        userRepository.findById(userId).ifPresent(refreshTokenRepository::deleteByUser);
    }

    private RefreshToken createRefreshToken(User user) {
        refreshTokenRepository.deleteByUser(user); // remove old tokens

        RefreshToken token = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(LocalDateTime.now().plusDays(7))
                .build();

        return refreshTokenRepository.save(token);
    }
}
