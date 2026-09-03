package com.drop4life.api.entity;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(length = 15)
    private String phone;

    private LocalDate dateOfBirth;

    @Column(length = 10)
    private String gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private BloodGroup bloodGroup;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private UserRole role;

    @Column(length = 500)
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 6)
    private String pincode;

    @Column(length = 100)
    private String country;

    private Double latitude;
    private Double longitude;

    @Builder.Default
    private Boolean isVerified = false;

    @Builder.Default
    private Boolean isAvailable = true;

    private LocalDate lastDonationDate;

    private Double weight;

    @Column(length = 500)
    private String medicalConditions;

    @Column(length = 100)
    private String emergencyContactName;

    @Column(length = 15)
    private String emergencyContactPhone;

    private String profileImageUrl;

    private String verificationDocumentUrl;

    // Hospital-specific fields
    @Column(length = 200)
    private String organizationName;

    @Column(length = 100)
    private String licenseNumber;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<BloodRequest> bloodRequests = new ArrayList<>();

    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Donation> donations = new ArrayList<>();
}
