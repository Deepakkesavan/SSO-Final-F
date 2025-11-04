import {
  Component,
  ViewChild,
  ViewContainerRef,
  Injector,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-lms-wrapper',
  standalone: true,
  template: `<ng-container #vc></ng-container>`,
  styleUrls: ['./lms-wrapper.component.scss'],
})
export class LmsWrapperComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef, static: true })
  vc!: ViewContainerRef;

  constructor(private route: ActivatedRoute, private injector: Injector) {}

  async ngOnInit() {
    const remoteComponentPath = this.route.snapshot.data['remoteComponent'];

    if (!remoteComponentPath) {
      console.error('No remoteComponent path provided in route data');
      return;
    }

    try {
      const remoteModule = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4200/remoteEntry.js', // LMS remote URL
        exposedModule: remoteComponentPath,
      });

      // Use default export or named export
      const comp = remoteModule.default ?? remoteModule.AppComponent;
      console.log(comp);

      if (!comp) {
        console.error('Remote module does not export AppComponent');
        return;
      }

      // Dynamically render the remote component
      this.vc.createComponent(comp, { injector: this.injector });
    } catch (err) {
      console.error('Failed to load remote component:', err);
    }
  }
}
