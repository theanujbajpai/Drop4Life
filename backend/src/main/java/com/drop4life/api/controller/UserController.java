package com.drop4life.api.controller;

import com.drop4life.api.dto.response.UserResponse;
import com.drop4life.api.security.SecurityUtils;
import com.drop4life.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(userService.getUserProfile(currentUserId));
    }

    @PutMapping("/availability")
    public ResponseEntity<UserResponse> updateAvailability(@RequestParam boolean available) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(userService.updateAvailability(currentUserId, available));
    }
}
