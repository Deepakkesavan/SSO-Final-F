import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(AppConfigService);

  private ssoBackendUrl!: string;

  // constructor() {
  //   this.appConfig.getConfiguration().subscribe((config) => {
  //     this.ssoBackendUrl = config?.SsoModule ?? 'https://sso-dev.clarium.tech';
  //   });
  // }

  loginWithAzure(): void {
    window.location.href = `http://localhost:8080/api/oauth2/authorization/azure`;
  }
}