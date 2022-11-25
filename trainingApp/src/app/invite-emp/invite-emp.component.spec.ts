import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteEmpComponent } from './invite-emp.component';

describe('InviteEmpComponent', () => {
  let component: InviteEmpComponent;
  let fixture: ComponentFixture<InviteEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
