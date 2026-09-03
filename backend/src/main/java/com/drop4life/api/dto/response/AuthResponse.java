package com.drop4life.api.dto.response;

import com.drop4life.api.enums.UserRole;
import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Long expiresIn;
    private UUID userId;
    private String email;
    private String fullName;
    private UserRole role;
    private String bloodGroup;
}
