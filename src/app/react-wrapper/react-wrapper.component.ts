import { loadRemoteModule } from '@angular-architects/module-federation';

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-react-wrapper',
  template: `<div #container></div>`,
  standalone: true,
})
export class ReactWrapperComponent {
  // remoteEntry?: string = environment.remotes.tms;
  remoteEntry?: string = environment.remotes.tms;
  exposedModule = './App';
  componentName: string = 'default';
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;
  private root?: any;

  async ngOnInit() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'http://localhost:4201/assets/RemoteApp-NQjBy405.css'; // adjust path as needed
    document.head.appendChild(link);
    if (!this.remoteEntry || !this.exposedModule) {
      console.error('Missing required inputs:', {
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });
      return;
    }

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
