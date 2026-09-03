export type BloodGroup =
  | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  | 'A_POSITIVE' | 'A_NEGATIVE' | 'B_POSITIVE' | 'B_NEGATIVE' | 'AB_POSITIVE' | 'AB_NEGATIVE' | 'O_POSITIVE' | 'O_NEGATIVE';

export type UserRole = 'DONOR' | 'REQUESTER' | 'HOSPITAL' | 'ADMIN';
export type UrgencyLevel = 'NORMAL' | 'URGENT' | 'CRITICAL';
export type RequestStatus = 'ACTIVE' | 'FULFILLED' | 'CANCELLED' | 'EXPIRED';
export type DonationStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  bloodGroup: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup: BloodGroup;
  role: UserRole;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  isAvailable: boolean;
  lastDonationDate?: string;
  weight?: number;
  medicalConditions?: string;
  organizationName?: string;
  licenseNumber?: string;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterPhone?: string;
  requesterEmail?: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  urgencyLevel: UrgencyLevel;
  hospitalName: string;
  hospitalAddress: string;
  hospitalPhone?: string;
  city: string;
  pincode?: string;
  requiredByDate: string;
  description?: string;
  contactNumber: string;
  reason: string;
  status: RequestStatus;
  latitude?: number;
  longitude?: number;
  donorsNotified: number;
  donorsResponded: number;
  unitsSecured: number;
  createdAt: string;
  updatedAt?: string;
}

export interface DonorMatch {
  id: string;
  fullName: string;
  bloodGroup: BloodGroup;
  city: string;
  state?: string;
  distanceKm: number;
  distanceTier: number;
  matchScore: number;
  isAvailable: boolean;
  lastDonationDate?: string;
  isVerified: boolean;
  responseStatus?: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  requestId?: string;
  bloodGroup: BloodGroup;
  unitsDonated: number;
  donationDate: string;
  hospitalName: string;
  hospitalAddress?: string;
  status: DonationStatus;
  notes?: string;
  createdAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode?: string;
  phone?: string;
  email?: string;
  website?: string;
  licenseNumber?: string;
  bloodBankAvailable: boolean;
  emergencyContact?: string;
  latitude?: number;
  longitude?: number;
  isVerified: boolean;
  inventory?: {
    bloodGroup: string;
    unitsAvailable: number;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id?: string;
  senderId?: string;
  senderName?: string;
  receiverId: string;
  receiverName?: string;
  requestId?: string;
  message: string;
  messageType?: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalDonors: number;
  activeDonors: number;
  totalBloodRequests: number;
  activeBloodRequests: number;
  criticalBloodRequests: number;
  totalDonations: number;
  completedDonations: number;
  totalHospitals: number;
  responseRate: number;
  averageResponseTime: string;
  requestsByBloodGroup: Record<string, number>;
}
