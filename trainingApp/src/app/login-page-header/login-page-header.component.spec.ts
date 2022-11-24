import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageHeaderComponent } from './login-page-header.component';

describe('LoginPageHeaderComponent', () => {
  let component: LoginPageHeaderComponent;
  let fixture: ComponentFixture<LoginPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
