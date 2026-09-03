package com.drop4life.api.service;

import com.drop4life.api.dto.request.ChatMessageDto;
import com.drop4life.api.entity.ChatMessage;
import com.drop4life.api.entity.User;
import com.drop4life.api.exception.ResourceNotFoundException;
import com.drop4life.api.repository.ChatMessageRepository;
import com.drop4life.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional
    public ChatMessageDto sendMessage(UUID senderId, ChatMessageDto dto) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender not found: " + senderId));
        User receiver = userRepository.findById(dto.getReceiverId())
                .orElseThrow(() -> new ResourceNotFoundException("Receiver not found: " + dto.getReceiverId()));

        ChatMessage chatMessage = ChatMessage.builder()
                .sender(sender)
                .receiver(receiver)
                .message(dto.getMessage())
                .messageType(dto.getMessageType() != null ? dto.getMessageType() : "text")
                .isRead(false)
                .build();

        ChatMessage saved = chatMessageRepository.save(chatMessage);
        ChatMessageDto result = toDto(saved);

        // Push to receiver's WebSocket queue
        try {
            messagingTemplate.convertAndSendToUser(
                    receiver.getId().toString(),
                    "/queue/messages",
                    result
            );
        } catch (Exception ignored) {}

        return result;
    }

    public List<ChatMessageDto> getConversation(UUID user1, UUID user2) {
        return chatMessageRepository.findConversationBetween(user1, user2)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ChatMessageDto toDto(ChatMessage m) {
        return ChatMessageDto.builder()
                .id(m.getId())
                .senderId(m.getSender().getId())
                .senderName(m.getSender().getFullName())
                .receiverId(m.getReceiver().getId())
                .receiverName(m.getReceiver().getFullName())
                .requestId(m.getBloodRequest() != null ? m.getBloodRequest().getId() : null)
                .message(m.getMessage())
                .messageType(m.getMessageType())
                .isRead(m.getIsRead())
                .createdAt(m.getCreatedAt())
                .build();
    }
}
