import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAlertMessagesComponent } from './notification-alert-messages.component';

describe('NotificationAlertMessagesComponent', () => {
  let component: NotificationAlertMessagesComponent;
  let fixture: ComponentFixture<NotificationAlertMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationAlertMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationAlertMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
