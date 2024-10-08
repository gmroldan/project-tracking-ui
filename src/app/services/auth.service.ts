import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../model/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  public login(credentials: {user: string, password: string}): Observable<void> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        const token = response.token;
        
        if (token) {
          this.saveToken(token);
        }
      })
    )
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public logout(router: Router): void {
    this.http.get<void>(`${this.apiUrl}/logout`).subscribe({
      next: () => {
        localStorage.removeItem(this.tokenKey);
        router.navigate(['/login']);
      },
      error(err) {
        console.error('Logout failed', err);
      },
    });
  }
}
