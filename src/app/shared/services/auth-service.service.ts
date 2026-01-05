import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser } from '../model/shared.model';
import { runtimeConfig } from '../../../config/runtime-config';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private readonly ssoBackendApi = runtimeConfig.ssoBackendUrl;
  private readonly customLoginApi = runtimeConfig.ssoCustomLoginUrl;
  private readonly http = inject(HttpClient);

  private userSubject = signal<{
    authenticated: boolean;
    user?: IUser;
  }>({ authenticated: false });

  public userSubjectOneSignal = this.userSubject.asReadonly();

  checkAuthStatus(): void {
    this.http
      .get<{ authenticated: boolean }>(
        `${this.ssoBackendApi}/api/auth/auth-status`,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap((status) => {
          if (status.authenticated) {
            // If authenticated, fetch full profile
            this.getUserProfile().subscribe();
          } else {
            this.userSubject.set({ authenticated: false });
          }
        }),
        catchError(() => {
          this.userSubject.set({ authenticated: false });
          return of(null);
        })
      )
      .subscribe();
  }

  checkAuthenticationStatus() {
    return this.http
      .get<{ authenticated: boolean; user?: IUser }>(
        `${this.ssoBackendApi}/api/auth/auth-status`,
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          // Update signal globally
          this.userSubject.set({
            authenticated: response.authenticated,
            user: response.user,
          });
        })
      );
  }

  /** ===================== FETCH FULL USER PROFILE ===================== */
  getUserProfile(): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.ssoBackendApi}/api/auth/user-profile`, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => this.userSubject.set({ authenticated: true, user })),
        catchError(() => {
          this.userSubject.set({ authenticated: false });
          return of(undefined as any);
        })
      );
  }

  /** ===================== CUSTOM LOGIN ===================== */
  customLogin(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.customLoginApi}/auth/signin`,
        { email, password },
        { withCredentials: true, observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const user = (res.body ?? {}) as IUser;
          this.userSubject.set({ authenticated: true, user });
        }),
        catchError((err) => {
          this.userSubject.set({ authenticated: false });
          throw err;
        })
      );
  }

  loginWithAzure(): void {
    window.location.href = `${this.ssoBackendApi}/oauth2/authorization/azure`;
  }

  /** ===================== LOGOUT ===================== */
  logout(): Observable<any> {
    return this.http
      .post(`${this.ssoBackendApi}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.clearAuth()),
        catchError(() => {
          this.clearAuth();
          return of(null);
        })
      );
  }

  /** ===================== HELPERS ===================== */
  isAuthenticated(): boolean {
    return this.userSubject().authenticated === true;
  }

  getUser(): IUser | undefined {
    return this.userSubject().user;
  }

  setUser(user: IUser): void {
    this.userSubject.set({ authenticated: true, user });
  }

  clearAuth(): void {
    this.userSubject.set({ authenticated: false });
    this.clearCookies();
  }

  private clearCookies(): void {
    const cookies = ['jwt', 'JSESSIONID', 'XSRF-TOKEN'];
    cookies.forEach((c) => {
      document.cookie = `${c}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  }
}
