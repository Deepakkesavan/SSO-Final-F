import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLoginPage } from './app-login.page';

describe('AppLoginPage', () => {
  let component: AppLoginPage;
  let fixture: ComponentFixture<AppLoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLoginPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
