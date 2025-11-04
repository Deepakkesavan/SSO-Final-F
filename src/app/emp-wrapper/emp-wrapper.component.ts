import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-emp-wrapper',
  template: `<div #container></div>`,
  standalone: true,
})
export class EmpWrapperComponent implements OnInit, OnDestroy {
  // remoteEntry?: string = 'http://localhost:4202/remoteEntry.js';
  remoteEntry?: string = environment.remotes.ems;
  exposedModule = './App';
  componentName: string = 'default';
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;
  private root?: any;

  async ngOnInit() {
    // const link = document.createElement('link');
    // link.rel = 'stylesheet';
    // link.href = 'http://localhost:4202/assets/App-C7Pqp_x8.css'; // adjust path as needed
    // document.head.appendChild(link);
    if (!this.remoteEntry || !this.exposedModule) {
      console.error('Missing required inputs:', {
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });
      return;
    }

    try {
      console.log('Loading remote:', this.remoteEntry, this.exposedModule);
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: this.remoteEntry,
        // remoteE: 'reactRemote',
        exposedModule: this.exposedModule,
      });

      console.log('Remote module loaded:', m);
      const ReactComponent = this.componentName
        ? m[this.componentName]
        : m.default;

      if (!ReactComponent) {
        console.error('React component not found in remote module.');
        return;
      }

      this.root = createRoot(this.container.nativeElement);
      this.root.render(React.createElement(ReactComponent));
      console.log('React component rendered successfully!');
    } catch (err) {
      console.error('Failed to load React remote:', err);
    }
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.unmount();
    }
  }
}
