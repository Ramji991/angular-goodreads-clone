import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'api/auth';
  private currentUser = {
    username: 'john_doe',
    email: 'john_doe@example.com',
    avatarUrl: 'https://picsum.photos/200?random=1'
  };

  constructor(private http: HttpClient) {}
  getCurrentUser() {
    return this.currentUser;
  }
  login(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { username,email, password }).pipe(
      tap((response) => this.setSession(response)),
      catchError(this.handleError<any>('login'))
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/register`, { username,email, password }).pipe(
      tap((response) => this.setSession(response)),
      catchError(this.handleError<any>('register'))
    );
  }
  updateProfile(data: FormData): Observable<any> {
    // Simulate a backend response
    return of({
      username: data.get('username'),
      email: data.get('email'),
      avatarUrl: 'https://picsum.photos/200?random=' + Math.floor(Math.random() * 100)
    }).pipe(
      delay(1000),
      catchError(error => {
        console.error('Update profile failed', error);
        return throwError('Failed to update profile');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private setSession(authResult): void {
    localStorage.setItem('token', authResult.token);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
