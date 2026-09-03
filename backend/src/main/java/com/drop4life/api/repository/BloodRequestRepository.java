package com.drop4life.api.repository;

import com.drop4life.api.entity.BloodRequest;
import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.RequestStatus;
import com.drop4life.api.enums.UrgencyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, UUID> {

    List<BloodRequest> findByStatusOrderByCreatedAtDesc(RequestStatus status);

    List<BloodRequest> findByRequesterIdOrderByCreatedAtDesc(UUID requesterId);

    List<BloodRequest> findByStatusAndBloodGroup(RequestStatus status, BloodGroup bloodGroup);

    List<BloodRequest> findByStatusAndUrgencyLevel(RequestStatus status, UrgencyLevel urgencyLevel);

    List<BloodRequest> findByStatusAndCity(RequestStatus status, String city);

    @Query("SELECT br FROM BloodRequest br WHERE br.status = :status AND br.requester.id = :requesterId AND br.createdAt > :since")
    List<BloodRequest> findRecentByRequester(
            @Param("status") RequestStatus status,
            @Param("requesterId") UUID requesterId,
            @Param("since") LocalDateTime since
    );

    long countByStatus(RequestStatus status);

    long countByStatusAndUrgencyLevel(RequestStatus status, UrgencyLevel urgencyLevel);

    @Query("SELECT br.bloodGroup, COUNT(br) FROM BloodRequest br WHERE br.status = :status GROUP BY br.bloodGroup")
    List<Object[]> countByBloodGroupAndStatus(@Param("status") RequestStatus status);
}
