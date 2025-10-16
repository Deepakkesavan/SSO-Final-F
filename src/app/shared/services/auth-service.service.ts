import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser } from '../../feature/dashboard/model/dashboard.model';
import { BACKEND_URLS } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private readonly API = 'http://localhost:8080/api/auth';
  private readonly CUSTOM_API = 'http://localhost:8080/custom-login/auth';

  
  public user$ = new Observable<{authenticated: boolean, user?:IUser}>();
  private userSubject = signal<{
    authenticated: boolean;
    user?: IUser;
  }>({ authenticated: false });
  public userSubjectOneSignal = this.userSubject.asReadonly();

  constructor(private http: HttpClient) {
    this.checkAuthStatus(); // only checks true/false
  }

  /** ===================== CHECK AUTH STATUS ===================== */
  checkAuthStatus(): void {
    this.http
      .get<{ authenticated: boolean }>(`${this.API}/auth-status`, {
        withCredentials: true,
      })
      .pipe(
        tap((status) =>
          this.userSubject.set({ authenticated: status.authenticated })
        ),
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
    .get<IUser>(`${BACKEND_URLS.SSOURL}/user-profile`, { withCredentials: true })
    .pipe(
      tap((user) => this.userSubject.set({ authenticated: true, user })),
      catchError(() => {
        this.userSubject.set({ authenticated: false });
        return of(undefined as any);
      })
    );
}
  

  customLogin(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.CUSTOM_API}/signin`,
        { username, password },
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

  /** ===================== OAUTH LOGIN ===================== */
  loginWithAzure(): void {
    window.location.href = `${this.API.replace(
      '/api/auth',
      ''
    )}/oauth2/authorization/azure`
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
      localStorage.clear();
      sessionStorage.clear();
      this.clearCookies();
    }

  private clearCookies(): void {
    const cookies = ['jwt', 'JSESSIONID', 'XSRF-TOKEN'];
    cookies.forEach((c) => {
      document.cookie = `${c}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
  }
}
