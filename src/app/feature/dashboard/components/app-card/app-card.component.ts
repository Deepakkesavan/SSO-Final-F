import { Component, input } from '@angular/core';
import { IAppCard } from '../../model/dashboard.model';

@Component({
  selector: 'app-app-card',
  imports: [],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss'
})
export class AppCardComponent {

  data = input<IAppCard[]>([]);

  onClick(index: number){
    const tempData = this.data();
    window.location.href = tempData[index].link;
  }
}
