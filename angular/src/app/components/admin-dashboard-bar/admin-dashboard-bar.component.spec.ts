import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardBarComponent } from './admin-dashboard-bar.component';

describe('AdminDashboardBarComponent', () => {
  let component: AdminDashboardBarComponent;
  let fixture: ComponentFixture<AdminDashboardBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
