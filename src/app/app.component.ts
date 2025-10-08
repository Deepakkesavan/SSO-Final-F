import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'oauth2-angular-app';
  constructor(private router: Router) {}

  ngOnInit() {

    const fullUrl = window.location.href;
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    const search = window.location.search; 
    const portnumber = window.location.port;
    
    console.log('Full URL:', fullUrl);
    console.log('Pathname:', pathname);

    if (pathname.includes('/admin')) {
      this.router.navigate(['/admin-dashboard']);
    } 
    else if(portnumber === '1234'){
      this.router.navigate(['user-login']);
    }
    else if (pathname === '/clarium/internal') {
      this.router.navigate(['azure-login']);
    }
    else if (hostname === 'subdomain.example.com') {
      this.router.navigate(['user-login']);
    }
  }
}
