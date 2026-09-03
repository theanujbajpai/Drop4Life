package com.drop4life.api.repository;

import com.drop4life.api.entity.Donation;
import com.drop4life.api.enums.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DonationRepository extends JpaRepository<Donation, UUID> {

    List<Donation> findByDonorIdOrderByDonationDateDesc(UUID donorId);

    List<Donation> findByBloodRequestId(UUID requestId);

    long countByStatus(DonationStatus status);

    @Query("SELECT MONTH(d.donationDate), COUNT(d) FROM Donation d WHERE YEAR(d.donationDate) = :year GROUP BY MONTH(d.donationDate)")
    List<Object[]> countByMonthForYear(@Param("year") int year);
}
