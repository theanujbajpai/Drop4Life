package com.drop4life.api.repository;

import com.drop4life.api.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
    List<AuditLog> findTop50ByOrderByTimestampDesc();
    List<AuditLog> findByUserIdOrderByTimestampDesc(UUID userId);
}
