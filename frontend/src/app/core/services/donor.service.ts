import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DonorMatch, User, BloodGroup } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private apiUrl = `${environment.apiUrl}/donors`;

  constructor(private http: HttpClient) {}

  getDonors(bloodGroup?: BloodGroup, city?: string): Observable<User[]> {
    let params = new HttpParams();
    if (bloodGroup) params = params.set('bloodGroup', bloodGroup);
    if (city) params = params.set('city', city);

    return this.http.get<User[]>(this.apiUrl, { params });
  }

  matchDonors(
    bloodGroup: BloodGroup,
    lat?: number,
    lng?: number,
    city?: string,
    radius: number = 50
  ): Observable<DonorMatch[]> {
    let params = new HttpParams().set('bloodGroup', bloodGroup);
    if (lat) params = params.set('lat', lat.toString());
    if (lng) params = params.set('lng', lng.toString());
    if (city) params = params.set('city', city);
    params = params.set('radius', radius.toString());

    return this.http.get<DonorMatch[]>(`${this.apiUrl}/match`, { params });
  }

  toggleAvailability(available: boolean): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/users/availability?available=${available}`, {});
  }
}
