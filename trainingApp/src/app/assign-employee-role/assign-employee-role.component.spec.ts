import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeeRoleComponent } from './assign-employee-role.component';

describe('AssignEmployeeRoleComponent', () => {
  let component: AssignEmployeeRoleComponent;
  let fixture: ComponentFixture<AssignEmployeeRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEmployeeRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignEmployeeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
