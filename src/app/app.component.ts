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
export class AppComponent {}
