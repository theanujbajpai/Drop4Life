package com.drop4life.api.dto.response;

import lombok.*;

import java.util.Map;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class DashboardStatsResponse {
    private long totalUsers;
    private long totalDonors;
    private long activeDonors;
    private long totalBloodRequests;
    private long activeBloodRequests;
    private long criticalBloodRequests;
    private long totalDonations;
    private long completedDonations;
    private long totalHospitals;
    private double responseRate;
    private String averageResponseTime;
    private Map<String, Long> requestsByBloodGroup;
}
