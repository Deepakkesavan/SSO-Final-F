import { Component, computed, input } from '@angular/core';
import { APP_LOGIN_BRANDING_DETAILS } from '../../../core/constants/constant';
import { brandingType } from '../../model/shared.model';

@Component({
  selector: 'app-branding',
  imports: [],
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.scss'
})
export class BrandingComponent {

  data = input<brandingType>();

  text = computed(()=> this.data());

}
