package com.drop4life.api.entity;

import com.drop4life.api.enums.DonorResponseStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "donor_responses")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class DonorResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private BloodRequest bloodRequest;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    @Builder.Default
    private DonorResponseStatus status = DonorResponseStatus.PENDING;

    private Double distanceKm;

    private Double matchScore;

    private LocalDateTime respondedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
