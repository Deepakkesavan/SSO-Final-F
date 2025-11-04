import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpWrapperComponent } from './emp-wrapper.component';

describe('EmpWrapperComponent', () => {
  let component: EmpWrapperComponent;
  let fixture: ComponentFixture<EmpWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
