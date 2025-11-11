import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardService } from '../service/dashboard.service';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  constructor() {}

  dashboardService = inject(DashboardService);

  cardData = toSignal(this.dashboardService.getCardData(), {
    initialValue: [],
  });
}
