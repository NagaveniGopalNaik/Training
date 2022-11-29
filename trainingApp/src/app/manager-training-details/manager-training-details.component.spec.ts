import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTrainingDetailsComponent } from './manager-training-details.component';

describe('ManagerTrainingDetailsComponent', () => {
  let component: ManagerTrainingDetailsComponent;
  let fixture: ComponentFixture<ManagerTrainingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerTrainingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerTrainingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
