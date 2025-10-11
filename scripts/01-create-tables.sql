-- Drop4Life Database Schema
-- Medical Blood Donation Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with medical information
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('donor', 'recipient', 'hospital', 'doctor')),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'India',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_verified BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  last_donation_date DATE,
  medical_conditions TEXT,
  emergency_contact_name VARCHAR(255),
  emergency_contact_phone VARCHAR(20),
  profile_image_url TEXT,
  verification_document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blood requests table
CREATE TABLE IF NOT EXISTS blood_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  patient_name VARCHAR(255) NOT NULL,
  blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_needed INTEGER NOT NULL DEFAULT 1,
  urgency_level VARCHAR(20) NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
  hospital_name VARCHAR(255) NOT NULL,
  hospital_address TEXT NOT NULL,
  hospital_phone VARCHAR(20),
  required_by_date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'cancelled', 'expired')),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  donor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  request_id UUID REFERENCES blood_requests(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blood_group VARCHAR(5) NOT NULL,
  units_donated INTEGER NOT NULL DEFAULT 1,
  donation_date TIMESTAMP WITH TIME ZONE NOT NULL,
  hospital_name VARCHAR(255) NOT NULL,
  hospital_address TEXT,
  status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  request_id UUID REFERENCES blood_requests(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'location', 'system')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('blood_request', 'donation_scheduled', 'chat_message', 'system', 'emergency')),
  related_id UUID, -- Can reference blood_requests, donations, etc.
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  license_number VARCHAR(100),
  blood_bank_available BOOLEAN DEFAULT FALSE,
  emergency_contact VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blood inventory table (for hospitals)
CREATE TABLE IF NOT EXISTS blood_inventory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
  blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  units_available INTEGER NOT NULL DEFAULT 0,
  expiry_date DATE,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_blood_group ON users(blood_group);
CREATE INDEX IF NOT EXISTS idx_users_location ON users(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_blood_requests_status ON blood_requests(status);
CREATE INDEX IF NOT EXISTS idx_blood_requests_urgency ON blood_requests(urgency_level);
CREATE INDEX IF NOT EXISTS idx_blood_requests_location ON blood_requests(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_donations_date ON donations(donation_date);
CREATE INDEX IF NOT EXISTS idx_chat_messages_participants ON chat_messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blood_requests_updated_at BEFORE UPDATE ON blood_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hospitals_updated_at BEFORE UPDATE ON hospitals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
