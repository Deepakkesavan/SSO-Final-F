import { Injectable, inject } from '@angular/core';
import { IAppCard, IUser } from '../model/dashboard.model';
import { BACKEND_URLS, FRONTEND_URLS } from '../../../urls/url';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'https://people-dev.clarium.tech/ssoapi/api/auth';
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<{
    authenticated: boolean;
    user?: IUser;
  }>({ authenticated: false });

  validateSession(): Observable<boolean> {
    return this.http
      .get(`${this.baseUrl}/validate`, { withCredentials: true })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  logoutSession(): Observable<boolean> {
    return this.http
      .post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  public user$ = this.userSubject.asObservable();

  getCardData(): Observable<IAppCard[]> {
    return of(this.cardData);
  }

  getUserProfile(): Observable<IUser> {
    return this.http
      .get<IUser>(`${BACKEND_URLS.SSOURL}/user-profile`, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => this.userSubject.next({ authenticated: true, user })),
        catchError(() => {
          this.userSubject.next({ authenticated: false });
          return of(undefined as any);
        })
      );
  }

  readonly cardData: IAppCard[] = [
    {
      applicationName: 'LMS APP',
      description: 'Access the Leave Management System',
      buttonTitle: 'Go to LMS',
      backgroundColor: '#e0f7fa',
      buttonColor: '#0078d4',
      link: FRONTEND_URLS.LMSURL,
    },
    {
      applicationName: 'RRF APP',
      description: 'Access the RRF Application',
      buttonTitle: 'Go to RRF',
      backgroundColor: '#fff3e0',
      buttonColor: '#f57c00',
      link: FRONTEND_URLS.RRFURL,
    },
  ];
}
