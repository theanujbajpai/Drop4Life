package com.drop4life.api.dto.response;

import com.drop4life.api.enums.BloodGroup;
import com.drop4life.api.enums.RequestStatus;
import com.drop4life.api.enums.UrgencyLevel;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BloodRequestResponse {
    private UUID id;
    private UUID requesterId;
    private String requesterName;
    private String requesterPhone;
    private String requesterEmail;
    private String patientName;
    private BloodGroup bloodGroup;
    private Integer unitsNeeded;
    private UrgencyLevel urgencyLevel;
    private String hospitalName;
    private String hospitalAddress;
    private String hospitalPhone;
    private String city;
    private String pincode;
    private LocalDateTime requiredByDate;
    private String description;
    private String contactNumber;
    private String reason;
    private RequestStatus status;
    private Double latitude;
    private Double longitude;
    private Integer donorsNotified;
    private Integer donorsResponded;
    private Integer unitsSecured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
