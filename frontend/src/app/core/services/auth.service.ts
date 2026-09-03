import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, UserRole } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return this.currentUserValue?.accessToken || localStorage.getItem('drop4life_token');
  }

  public get refreshToken(): string | null {
    return this.currentUserValue?.refreshToken || localStorage.getItem('drop4life_refresh_token');
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public hasRole(role: UserRole): boolean {
    return this.currentUserValue?.role === role;
  }

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => this.handleAuthSuccess(res))
    );
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = this.refreshToken;
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap(res => this.handleAuthSuccess(res)),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    if (this.isAuthenticated()) {
      this.http.post(`${this.apiUrl}/logout`, {}).subscribe({ error: () => {} });
    }
    localStorage.removeItem('drop4life_token');
    localStorage.removeItem('drop4life_refresh_token');
    localStorage.removeItem('drop4life_user');
    this.currentUserSubject.next(null);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('drop4life_token', response.accessToken);
    localStorage.setItem('drop4life_refresh_token', response.refreshToken);
    localStorage.setItem('drop4life_user', JSON.stringify(response));
    this.currentUserSubject.next(response);
  }

  private getStoredUser(): AuthResponse | null {
    try {
      const user = localStorage.getItem('drop4life_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}
