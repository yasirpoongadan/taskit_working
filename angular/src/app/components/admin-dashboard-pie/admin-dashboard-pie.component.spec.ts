import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardPieComponent } from './admin-dashboard-pie.component';

describe('AdminDashboardPieComponent', () => {
  let component: AdminDashboardPieComponent;
  let fixture: ComponentFixture<AdminDashboardPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
