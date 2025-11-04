import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EzuiIconModule } from '@clarium/ezui-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EzuiIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router);
  // constructor(private router: Router) {}

  ngOnInit() {
    const fullUrl = window.location.href;
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    const search = window.location.search;
    const portnumber = window.location.port;

    console.log('Full URL:', fullUrl);
    console.log('Pathname:', pathname);
    this.router.events.subscribe((event) => {
      console.log('[Router Event]', event);
    });

    // const routePath = pathname.replace('/ssoui', '') || '/';

    if (pathname.includes('/admin')) {
      this.router.navigateByUrl('/admin-dashboard');
    } else if (portnumber === '1234') {
      this.router.navigate(['user-login']);
    } else if (pathname === '/clarium/internal') {
      this.router.navigate(['azure-login']);
    } else if (hostname === 'subdomain.example.com') {
      this.router.navigate(['user-login']);
    }
  }
}
