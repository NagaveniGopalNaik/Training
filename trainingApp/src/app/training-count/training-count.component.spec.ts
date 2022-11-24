import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCountComponent } from './training-count.component';

describe('TrainingCountComponent', () => {
  let component: TrainingCountComponent;
  let fixture: ComponentFixture<TrainingCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
