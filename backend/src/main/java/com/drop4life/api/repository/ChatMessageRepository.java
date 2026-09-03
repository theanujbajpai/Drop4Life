package com.drop4life.api.repository;

import com.drop4life.api.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

    @Query("SELECT cm FROM ChatMessage cm WHERE (cm.sender.id = :userId OR cm.receiver.id = :userId) ORDER BY cm.createdAt DESC")
    List<ChatMessage> findConversationsForUser(@Param("userId") UUID userId);

    @Query("SELECT cm FROM ChatMessage cm WHERE ((cm.sender.id = :user1 AND cm.receiver.id = :user2) OR (cm.sender.id = :user2 AND cm.receiver.id = :user1)) ORDER BY cm.createdAt ASC")
    List<ChatMessage> findConversationBetween(@Param("user1") UUID user1, @Param("user2") UUID user2);

    long countByReceiverIdAndIsReadFalse(UUID receiverId);
}
