import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser } from '../../feature/dashboard/model/dashboard.model';
import { BACKEND_URLS } from '../../environments/environment';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private readonly API = BACKEND_URLS.SSOURL;
  private readonly CUSTOM_API =
    'https://people-dev.clarium.tech/custom-login/auth';

  private userSubject = signal<{
    authenticated: boolean;
    user?: IUser;
  }>({ authenticated: false });

  public userSubjectOneSignal = this.userSubject.asReadonly();

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  /** ===================== CHECK AUTH STATUS ===================== */
  checkAuthStatus(): void {
    this.http
      .get<{ authenticated: boolean }>(`${this.API}/auth-status`, {
        withCredentials: true,
      })
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

  /** ===================== FETCH FULL USER PROFILE ===================== */
  getUserProfile(): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.API}/user-profile`, { withCredentials: true })
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
        `${this.CUSTOM_API}/signin`,
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

  // /** ===================== OAUTH LOGIN ===================== */
  // loginWithAzure(): void {
  //   window.location.href = `${this.baseUrl}/oauth2/authorization/azure`;
  //   // window.location.href = `https://people-dev.clarium.tech/ssoapi/oauth2/authorization/azure`;
  // }

  loginWithAzure(): void {
    window.location.href = `${this.baseUrl}/oauth2/authorization/azure`;
  }

  /** ===================== LOGOUT ===================== */
  logout(): Observable<any> {
    return this.http
      .post(`${this.API}/logout`, {}, { withCredentials: true })
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
