-- Seed data for Drop4Life platform

-- Insert sample hospitals
INSERT INTO hospitals (name, address, city, state, postal_code, phone, email, blood_bank_available, latitude, longitude, is_verified) VALUES
('Apollo Hospital', '21, Greams Lane, Off Greams Road', 'Chennai', 'Tamil Nadu', '600006', '+91-44-2829-3333', 'info@apollohospitals.com', true, 13.0827, 80.2707, true),
('Fortis Hospital', 'Sector 62, Phase VIII', 'Mohali', 'Punjab', '160062', '+91-172-496-7000', 'info@fortishealthcare.com', true, 30.6942, 76.7344, true),
('Max Super Speciality Hospital', '1, Press Enclave Road, Saket', 'New Delhi', 'Delhi', '110017', '+91-11-2651-5050', 'info@maxhealthcare.com', true, 28.5244, 77.2066, true),
('Manipal Hospital', '98, Rustom Bagh', 'Bangalore', 'Karnataka', '560017', '+91-80-2502-4444', 'info@manipalhospitals.com', true, 12.9716, 77.5946, true),
('Lilavati Hospital', 'A-791, Bandra Reclamation', 'Mumbai', 'Maharashtra', '400050', '+91-22-2675-1000', 'info@lilavatihospital.com', true, 19.0596, 72.8295, true);

-- Insert blood inventory for hospitals
INSERT INTO blood_inventory (hospital_id, blood_group, units_available, expiry_date) 
SELECT 
  h.id,
  bg.blood_group,
  FLOOR(RANDOM() * 50 + 10)::INTEGER,
  CURRENT_DATE + INTERVAL '30 days'
FROM hospitals h
CROSS JOIN (
  VALUES ('A+'), ('A-'), ('B+'), ('B-'), ('AB+'), ('AB-'), ('O+'), ('O-')
) AS bg(blood_group)
WHERE h.is_verified = true;

-- Insert sample users (donors and recipients)
INSERT INTO users (email, full_name, phone, date_of_birth, gender, blood_group, user_type, address, city, state, postal_code, latitude, longitude, is_verified, is_available) VALUES
('john.donor@email.com', 'John Smith', '+91-9876543210', '1990-05-15', 'male', 'O+', 'donor', '123 MG Road', 'Bangalore', 'Karnataka', '560001', 12.9716, 77.5946, true, true),
('sarah.donor@email.com', 'Sarah Johnson', '+91-9876543211', '1988-08-22', 'female', 'A+', 'donor', '456 Park Street', 'Kolkata', 'West Bengal', '700016', 22.5726, 88.3639, true, true),
('mike.recipient@email.com', 'Mike Wilson', '+91-9876543212', '1985-12-10', 'male', 'B+', 'recipient', '789 Marine Drive', 'Mumbai', 'Maharashtra', '400020', 19.0176, 72.8562, true, false),
('dr.patel@hospital.com', 'Dr. Priya Patel', '+91-9876543213', '1975-03-18', 'female', 'AB+', 'doctor', 'Apollo Hospital, Greams Road', 'Chennai', 'Tamil Nadu', '600006', 13.0827, 80.2707, true, true),
('admin@fortis.com', 'Fortis Hospital Admin', '+91-9876543214', '1980-07-25', 'male', 'O-', 'hospital', 'Fortis Hospital, Sector 62', 'Mohali', 'Punjab', '160062', 30.6942, 76.7344, true, true);

-- Insert sample blood requests
INSERT INTO blood_requests (requester_id, patient_name, blood_group, units_needed, urgency_level, hospital_name, hospital_address, hospital_phone, required_by_date, description, latitude, longitude) VALUES
((SELECT id FROM users WHERE email = 'mike.recipient@email.com'), 'Mike Wilson', 'B+', 2, 'high', 'Lilavati Hospital', 'A-791, Bandra Reclamation, Mumbai', '+91-22-2675-1000', NOW() + INTERVAL '2 days', 'Urgent requirement for surgery', 19.0596, 72.8295),
((SELECT id FROM users WHERE email = 'dr.patel@hospital.com'), 'Emergency Patient', 'O-', 3, 'critical', 'Apollo Hospital', '21, Greams Lane, Chennai', '+91-44-2829-3333', NOW() + INTERVAL '6 hours', 'Critical emergency case', 13.0827, 80.2707);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
((SELECT id FROM users WHERE email = 'john.donor@email.com'), 'New Blood Request Nearby', 'A B+ blood request has been posted 2km from your location', 'blood_request', false),
((SELECT id FROM users WHERE email = 'sarah.donor@email.com'), 'Donation Reminder', 'You are eligible to donate blood again. Your last donation was 4 months ago.', 'system', false),
((SELECT id FROM users WHERE email = 'mike.recipient@email.com'), 'Request Status Update', 'Your blood request has been viewed by 5 potential donors', 'blood_request', false);
