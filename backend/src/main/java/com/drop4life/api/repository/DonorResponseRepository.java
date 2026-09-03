package com.drop4life.api.repository;

import com.drop4life.api.entity.DonorResponse;
import com.drop4life.api.enums.DonorResponseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DonorResponseRepository extends JpaRepository<DonorResponse, UUID> {
    List<DonorResponse> findByBloodRequestId(UUID requestId);
    List<DonorResponse> findByDonorIdOrderByCreatedAtDesc(UUID donorId);
    Optional<DonorResponse> findByDonorIdAndBloodRequestId(UUID donorId, UUID requestId);
    long countByBloodRequestIdAndStatus(UUID requestId, DonorResponseStatus status);
}
