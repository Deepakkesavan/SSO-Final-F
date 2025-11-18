import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureButtonComponent } from './azure-button.component';

describe('AzureButtonComponent', () => {
  let component: AzureButtonComponent;
  let fixture: ComponentFixture<AzureButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzureButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
