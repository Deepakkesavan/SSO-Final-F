import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsWrapperComponent } from './lms-wrapper.component';

describe('LmsWrapperComponent', () => {
  let component: LmsWrapperComponent;
  let fixture: ComponentFixture<LmsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
