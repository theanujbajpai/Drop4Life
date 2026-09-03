package com.drop4life.api.controller;

import com.drop4life.api.dto.response.DonorMatchResponse;
import com.drop4life.api.dto.response.UserResponse;
import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.service.DonorMatchingService;
import com.drop4life.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@RequiredArgsConstructor
public class DonorController {

    private final UserService userService;
    private final DonorMatchingService donorMatchingService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getDonors(
            @RequestParam(required = false) BloodGroup bloodGroup,
            @RequestParam(required = false) String city
    ) {
        return ResponseEntity.ok(userService.getDonors(bloodGroup, city));
    }

    @GetMapping("/match")
    public ResponseEntity<List<DonorMatchResponse>> matchDonors(
            @RequestParam BloodGroup bloodGroup,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng,
            @RequestParam(required = false) String city,
            @RequestParam(required = false, defaultValue = "50") Double radius
    ) {
        List<DonorMatchResponse> matched = donorMatchingService.findMatchedDonors(bloodGroup, lat, lng, city, radius);
        return ResponseEntity.ok(matched);
    }
}
