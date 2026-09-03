package com.drop4life.api.entity;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.DonationStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "donations")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private BloodRequest bloodRequest;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private BloodGroup bloodGroup;

    @Column(nullable = false)
    @Builder.Default
    private Integer unitsDonated = 1;

    @Column(nullable = false)
    private LocalDateTime donationDate;

    @Column(nullable = false, length = 200)
    private String hospitalName;

    @Column(length = 500)
    private String hospitalAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    @Builder.Default
    private DonationStatus status = DonationStatus.SCHEDULED;

    @Column(length = 500)
    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
