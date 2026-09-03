package com.drop4life.api.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class NotificationResponse {
    private UUID id;
    private String title;
    private String message;
    private String type;
    private UUID relatedId;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
