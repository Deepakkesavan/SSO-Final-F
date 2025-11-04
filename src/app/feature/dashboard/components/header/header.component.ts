import { Component, ViewChild, ElementRef } from '@angular/core';
import { EzuiIconModule } from '@clarium/ezui-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [EzuiIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('colorInput') colorInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    const savedColor = localStorage.getItem('themeColor') || '#19376d';
    document.documentElement.style.setProperty('--primary-color', savedColor);
    console.log('Dispatching themeChange with color:', savedColor);
    // Dispatch initial theme color to remotes on load
    window.dispatchEvent(
      new CustomEvent('themeChange', { detail: { color: savedColor } })
    );
  }

  openColorPicker() {
    this.colorInput.nativeElement.click();
  }

  changeThemeColor(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedColor = input.value;

    // Update host theme immediately
    document.documentElement.style.setProperty(
      '--primary-color',
      selectedColor
    );

    // Save locally
    localStorage.setItem('themeColor', selectedColor);
    console.log('Dispatching themeChange with color:', selectedColor);
    // Broadcast to all remotes
    window.dispatchEvent(
      new CustomEvent('themeChange', { detail: { color: selectedColor } })
    );
  }
}
