package com.drop4life.api.controller;

import com.drop4life.api.dto.request.ChatMessageDto;
import com.drop4life.api.security.SecurityUtils;
import com.drop4life.api.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/messages")
    public ResponseEntity<ChatMessageDto> sendMessage(@Valid @RequestBody ChatMessageDto dto) {
        UUID senderId = SecurityUtils.getCurrentUserId();
        ChatMessageDto response = chatService.sendMessage(senderId, dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/messages/{otherUserId}")
    public ResponseEntity<List<ChatMessageDto>> getConversation(@PathVariable UUID otherUserId) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return ResponseEntity.ok(chatService.getConversation(currentUserId, otherUserId));
    }
}
