package com.drop4life.api.entity;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.RequestStatus;
import com.drop4life.api.enums.UrgencyLevel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "blood_requests")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @Column(nullable = false, length = 100)
    private String patientName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private BloodGroup bloodGroup;

    @Column(nullable = false)
    private Integer unitsNeeded;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private UrgencyLevel urgencyLevel;

    @Column(nullable = false, length = 200)
    private String hospitalName;

    @Column(nullable = false, length = 500)
    private String hospitalAddress;

    @Column(length = 15)
    private String hospitalPhone;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(length = 6)
    private String pincode;

    @Column(nullable = false)
    private LocalDateTime requiredByDate;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, length = 100)
    private String contactNumber;

    @Column(length = 500)
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    @Builder.Default
    private RequestStatus status = RequestStatus.ACTIVE;

    private Double latitude;
    private Double longitude;

    @Builder.Default
    private Integer donorsNotified = 0;

    @Builder.Default
    private Integer donorsResponded = 0;

    @Builder.Default
    private Integer unitsSecured = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "bloodRequest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<DonorResponse> donorResponses = new ArrayList<>();
}
