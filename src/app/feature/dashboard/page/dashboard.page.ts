import {
  Component,
  inject,
  computed,
  signal,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DashboardStore } from '../store/dashboard.store';
import { IAppCard } from '../model/dashboard.model';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EzuiIconModule } from '@clarium/ezui-icons';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  // standalone:true,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  providers: [DashboardStore, RouterOutlet],
  imports: [
    RouterOutlet,
    CommonModule,
    EzuiIconModule,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class DashboardPage {
  cardData = signal<IAppCard[]>([]);
  private readonly router = inject(Router);

  constructor() {}

  dashboardStore = inject(DashboardStore);

  ngOnInit(): void {
    this.cardData.set(this.dashboardStore.cardData());
    const savedColor = localStorage.getItem('custom-theme-color');
    if (savedColor) {
      document.documentElement.style.setProperty('--primary-color', savedColor);
    }
  }

  applicaitonData = computed(() => this.cardData());
}
