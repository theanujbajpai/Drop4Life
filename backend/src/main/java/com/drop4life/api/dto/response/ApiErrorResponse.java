package com.drop4life.api.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ApiErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    private String path;
    private List<String> errors;
}
