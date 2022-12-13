import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReporteesComponent } from './assign-reportees.component';

describe('AssignReporteesComponent', () => {
  let component: AssignReporteesComponent;
  let fixture: ComponentFixture<AssignReporteesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignReporteesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignReporteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
