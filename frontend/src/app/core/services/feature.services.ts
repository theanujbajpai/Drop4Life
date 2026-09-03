import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hospital, Donation, NotificationItem, ChatMessage, DashboardStats } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = `${environment.apiUrl}/hospitals`;

  constructor(private http: HttpClient) {}

  getHospitals(city?: string): Observable<Hospital[]> {
    let params = new HttpParams();
    if (city) params = params.set('city', city);
    return this.http.get<Hospital[]>(this.apiUrl, { params });
  }

  getHospitalById(id: string): Observable<Hospital> {
    return this.http.get<Hospital>(`${this.apiUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = `${environment.apiUrl}/donations`;

  constructor(private http: HttpClient) {}

  recordDonation(data: any): Observable<Donation> {
    return this.http.post<Donation>(this.apiUrl, data);
  }

  getMyDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${this.apiUrl}/my`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getMyNotifications(): Observable<NotificationItem[]> {
    return this.http.get<NotificationItem[]>(this.apiUrl);
  }

  markAsRead(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/read`, {});
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) {}

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/messages`, message);
  }

  getConversation(otherUserId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages/${otherUserId}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAdminStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${environment.apiUrl}/admin/dashboard`);
  }

  getAuditLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/admin/audit-logs`);
  }
}
