package com.drop4life.api.controller;

import com.drop4life.api.dto.request.BloodRequestCreateDto;
import com.drop4life.api.dto.response.BloodRequestResponse;
import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.UrgencyLevel;
import com.drop4life.api.security.SecurityUtils;
import com.drop4life.api.service.BloodRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/blood-requests")
@RequiredArgsConstructor
public class BloodRequestController {

    private final BloodRequestService bloodRequestService;

    @GetMapping
    public ResponseEntity<List<BloodRequestResponse>> getActiveRequests(
            @RequestParam(required = false) BloodGroup bloodGroup,
            @RequestParam(required = false) UrgencyLevel urgency,
            @RequestParam(required = false) String city
    ) {
        return ResponseEntity.ok(bloodRequestService.getActiveRequests(bloodGroup, urgency, city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BloodRequestResponse> getRequestById(@PathVariable UUID id) {
        return ResponseEntity.ok(bloodRequestService.getRequestById(id));
    }

    @PostMapping
    public ResponseEntity<BloodRequestResponse> createBloodRequest(@Valid @RequestBody BloodRequestCreateDto dto) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        BloodRequestResponse response = bloodRequestService.createBloodRequest(currentUserId, dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<BloodRequestResponse>> getMyRequests() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(bloodRequestService.getRequestsByRequester(currentUserId));
    }

    @PostMapping("/{id}/respond")
    public ResponseEntity<BloodRequestResponse> respondToRequest(
            @PathVariable UUID id,
            @RequestParam boolean accept
    ) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(bloodRequestService.respondToRequest(id, currentUserId, accept));
    }
}
