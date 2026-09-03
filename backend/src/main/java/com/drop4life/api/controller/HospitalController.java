package com.drop4life.api.controller;

import com.drop4life.api.dto.response.HospitalDto;
import com.drop4life.api.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<HospitalDto>> getHospitals(@RequestParam(required = false) String city) {
        return ResponseEntity.ok(hospitalService.getHospitals(city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HospitalDto> getHospitalById(@PathVariable UUID id) {
        return ResponseEntity.ok(hospitalService.getHospitalById(id));
    }
}
