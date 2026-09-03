package com.drop4life.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ChatMessageDto {
    private UUID id;

    private UUID senderId;
    private String senderName;

    @NotNull(message = "Receiver id is required")
    private UUID receiverId;
    private String receiverName;

    private UUID requestId;

    @NotBlank(message = "Message cannot be empty")
    private String message;

    @Builder.Default
    private String messageType = "text";

    private Boolean isRead;
    private LocalDateTime createdAt;
}
