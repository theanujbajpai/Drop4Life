package com.drop4life.api.controller;

import com.drop4life.api.dto.response.DashboardStatsResponse;
import com.drop4life.api.dto.response.UserResponse;
import com.drop4life.api.entity.AuditLog;
import com.drop4life.api.repository.AuditLogRepository;
import com.drop4life.api.service.DashboardService;
import com.drop4life.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final DashboardService dashboardService;
    private final UserService userService;
    private final AuditLogRepository auditLogRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllDonors() {
        return ResponseEntity.ok(userService.getDonors(null, null));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditLogRepository.findTop50ByOrderByTimestampDesc());
    }
}
