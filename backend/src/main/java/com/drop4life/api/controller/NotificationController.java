package com.drop4life.api.controller;

import com.drop4life.api.dto.response.NotificationResponse;
import com.drop4life.api.security.SecurityUtils;
import com.drop4life.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getMyNotifications() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(notificationService.getUserNotifications(currentUserId));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable UUID id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }
}
