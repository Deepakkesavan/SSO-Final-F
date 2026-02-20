import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private baseUrl = new URL(document.baseURI);
  private configUrl = `${this.baseUrl}config/api/ClariumConfiguration/modules`;

  getConfiguration(): Observable<any> {
    return this.http.post(this.configUrl, {});
  }
}
