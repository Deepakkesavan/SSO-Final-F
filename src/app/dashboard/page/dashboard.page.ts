import { Component, inject, computed, signal } from '@angular/core';
import { DashboardStore } from '../store/dashboard.store';
import { IAppCard } from '../model/dashboard.model';
import { HeaderComponent } from "../components/header/header.component";
import { AppCardComponent } from "../components/app-card/app-card.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [DashboardStore],
  imports: [HeaderComponent, AppCardComponent]
})
export class DashboardPage {
  
  cardData = signal<IAppCard[]>([]);

  constructor() {}

  dashboardStore = inject(DashboardStore);

  ngOnInit(): void {
    
    this.cardData.set(this.dashboardStore.cardData());
  }

  applicaitonData = computed(()=> this.cardData());
  
}
