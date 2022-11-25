import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeHeaderComponent } from './add-employee-header.component';

describe('AddEmployeeHeaderComponent', () => {
  let component: AddEmployeeHeaderComponent;
  let fixture: ComponentFixture<AddEmployeeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
