package com.drop4life.api.entity;

import com.drop4life.api.enums.BloodGroup;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "blood_inventory")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BloodInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private BloodGroup bloodGroup;

    @Column(nullable = false)
    @Builder.Default
    private Integer unitsAvailable = 0;

    private LocalDate expiryDate;

    private LocalDateTime lastUpdated;
}
