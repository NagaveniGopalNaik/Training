import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainingDetailsComponent } from './admin-training-details.component';

describe('AdminTrainingDetailsComponent', () => {
  let component: AdminTrainingDetailsComponent;
  let fixture: ComponentFixture<AdminTrainingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrainingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTrainingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
