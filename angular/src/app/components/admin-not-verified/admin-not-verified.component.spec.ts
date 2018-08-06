import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotVerifiedComponent } from './admin-not-verified.component';

describe('AdminNotVerifiedComponent', () => {
  let component: AdminNotVerifiedComponent;
  let fixture: ComponentFixture<AdminNotVerifiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNotVerifiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
