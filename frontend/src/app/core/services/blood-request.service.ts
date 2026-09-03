import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BloodRequest, BloodGroup, UrgencyLevel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {
  private apiUrl = `${environment.apiUrl}/blood-requests`;

  constructor(private http: HttpClient) {}

  getActiveRequests(bloodGroup?: BloodGroup, urgency?: UrgencyLevel, city?: string): Observable<BloodRequest[]> {
    let params = new HttpParams();
    if (bloodGroup) params = params.set('bloodGroup', bloodGroup);
    if (urgency) params = params.set('urgency', urgency);
    if (city) params = params.set('city', city);

    return this.http.get<BloodRequest[]>(this.apiUrl, { params });
  }

  getRequestById(id: string): Observable<BloodRequest> {
    return this.http.get<BloodRequest>(`${this.apiUrl}/${id}`);
  }

  createRequest(data: any): Observable<BloodRequest> {
    return this.http.post<BloodRequest>(this.apiUrl, data);
  }

  getMyRequests(): Observable<BloodRequest[]> {
    return this.http.get<BloodRequest[]>(`${this.apiUrl}/my`);
  }

  respondToRequest(id: string, accept: boolean): Observable<BloodRequest> {
    return this.http.post<BloodRequest>(`${this.apiUrl}/${id}/respond?accept=${accept}`, {});
  }
}
