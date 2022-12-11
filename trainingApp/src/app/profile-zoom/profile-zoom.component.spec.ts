import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileZoomComponent } from './profile-zoom.component';

describe('ProfileZoomComponent', () => {
  let component: ProfileZoomComponent;
  let fixture: ComponentFixture<ProfileZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileZoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
