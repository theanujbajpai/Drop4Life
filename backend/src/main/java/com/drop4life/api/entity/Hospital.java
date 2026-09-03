package com.drop4life.api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "hospitals")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 500)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(length = 6)
    private String pincode;

    @Column(length = 15)
    private String phone;

    private String email;
    private String website;

    @Column(length = 100)
    private String licenseNumber;

    @Builder.Default
    private Boolean bloodBankAvailable = false;

    @Column(length = 15)
    private String emergencyContact;

    private Double latitude;
    private Double longitude;

    @Builder.Default
    private Boolean isVerified = false;

    @CreationTimestamp
    private java.time.LocalDateTime createdAt;

    @UpdateTimestamp
    private java.time.LocalDateTime updatedAt;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<BloodInventory> bloodInventory = new ArrayList<>();
}
