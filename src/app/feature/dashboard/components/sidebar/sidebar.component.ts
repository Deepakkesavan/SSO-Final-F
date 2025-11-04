import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EzuiIconModule } from '@clarium/ezui-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [EzuiIconModule, FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  // header.component.ts (or sidebar.component.ts)
  private readonly route = inject(Router);
  navItems = [
    { label: 'Home', route: 'ems', icon: 'fa-regular fa-house' },
    { label: 'LMS', route: 'lms', icon: 'fa-regular fa-chart-bar' },
    { label: 'TMS', route: 'tms', icon: 'fa-regular fa-clock' },
    { label: 'RRF', route: 'rrf', icon: 'fa-regular fa-clock' },
    { label: 'PMS', route: 'pm', icon: 'fa-regular fa-chart-bar' },
  ];

  navigate(item: any) {
    if (!item || !item.route) return;
    this.route.navigate(['dashboard', item.route]);
  }

  OnLogout() {
    this.route.navigate(['/azure-login']);
  }
}
