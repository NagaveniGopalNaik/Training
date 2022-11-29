import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteReporteesComponent } from './invite-reportees.component';

describe('InviteReporteesComponent', () => {
  let component: InviteReporteesComponent;
  let fixture: ComponentFixture<InviteReporteesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteReporteesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteReporteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
