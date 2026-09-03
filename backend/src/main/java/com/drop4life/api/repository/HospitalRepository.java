package com.drop4life.api.repository;

import com.drop4life.api.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, UUID> {
    List<Hospital> findByCity(String city);
    List<Hospital> findByIsVerifiedTrue();
    List<Hospital> findByCityAndIsVerifiedTrue(String city);
}
