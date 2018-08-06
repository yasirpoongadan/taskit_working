import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscribedComponent } from './admin-subscribed.component';

describe('AdminSubscribedComponent', () => {
  let component: AdminSubscribedComponent;
  let fixture: ComponentFixture<AdminSubscribedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubscribedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
