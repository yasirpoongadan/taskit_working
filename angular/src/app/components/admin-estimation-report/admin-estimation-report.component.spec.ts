import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstimationReportComponent } from './admin-estimation-report.component';

describe('AdminEstimationReportComponent', () => {
  let component: AdminEstimationReportComponent;
  let fixture: ComponentFixture<AdminEstimationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEstimationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEstimationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
