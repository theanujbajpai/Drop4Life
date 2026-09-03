package com.drop4life.api.controller;

import com.drop4life.api.dto.request.DonationCreateDto;
import com.drop4life.api.dto.response.DonationResponse;
import com.drop4life.api.security.SecurityUtils;
import com.drop4life.api.service.DonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public ResponseEntity<DonationResponse> recordDonation(@Valid @RequestBody DonationCreateDto dto) {
        if (dto.getDonorId() == null) {
            dto.setDonorId(SecurityUtils.getCurrentUserId());
        }
        DonationResponse response = donationService.recordDonation(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<DonationResponse>> getMyDonations() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(donationService.getDonationsByDonor(currentUserId));
    }
}
