package com.drop4life.api.repository;

import com.drop4life.api.entity.BloodInventory;
import com.drop4life.api.enums.BloodGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BloodInventoryRepository extends JpaRepository<BloodInventory, UUID> {
    List<BloodInventory> findByHospitalId(UUID hospitalId);
    Optional<BloodInventory> findByHospitalIdAndBloodGroup(UUID hospitalId, BloodGroup bloodGroup);
}
