import { Component, computed, input } from '@angular/core';
import { BrandingComponent } from "../branding/branding.component";
import { USER_LOGIN_BRANDING_DETAILS } from '../../../core/constants/constant';
import { brandingType } from '../../model/shared.model';

@Component({
  selector: 'app-layout',
  imports: [BrandingComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  data = input<brandingType>();
  brandingDetails = computed(()=> this.data());

}
