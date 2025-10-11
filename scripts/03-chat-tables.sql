-- Create chat rooms table
CREATE TABLE IF NOT EXISTS chat_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    donor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    blood_request_id UUID REFERENCES blood_requests(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'scheduled', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    chat_room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'system', 'emergency', 'image', 'location')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chat_rooms_recipient ON chat_rooms(recipient_id);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_donor ON chat_rooms(donor_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_room ON messages(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Enable Row Level Security
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for chat rooms
CREATE POLICY "Users can view their own chat rooms" ON chat_rooms
    FOR SELECT USING (
        auth.uid() = recipient_id OR 
        auth.uid() = donor_id
    );

CREATE POLICY "Users can create chat rooms" ON chat_rooms
    FOR INSERT WITH CHECK (
        auth.uid() = recipient_id OR 
        auth.uid() = donor_id
    );

-- Create policies for messages
CREATE POLICY "Users can view messages in their chat rooms" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM chat_rooms 
            WHERE chat_rooms.id = messages.chat_room_id 
            AND (chat_rooms.recipient_id = auth.uid() OR chat_rooms.donor_id = auth.uid())
        )
    );

CREATE POLICY "Users can send messages in their chat rooms" ON messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM chat_rooms 
            WHERE chat_rooms.id = messages.chat_room_id 
            AND (chat_rooms.recipient_id = auth.uid() OR chat_rooms.donor_id = auth.uid())
        )
        AND auth.uid() = sender_id
    );

-- Function to update chat room timestamp when new message is sent
CREATE OR REPLACE FUNCTION update_chat_room_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chat_rooms 
    SET updated_at = NOW() 
    WHERE id = NEW.chat_room_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update chat room timestamp
CREATE TRIGGER update_chat_room_on_message
    AFTER INSERT ON messages
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_room_timestamp();
