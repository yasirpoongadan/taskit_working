import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyActivityLogReportComponent } from './company-activity-log-report.component';

describe('CompanyActivityLogReportComponent', () => {
  let component: CompanyActivityLogReportComponent;
  let fixture: ComponentFixture<CompanyActivityLogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyActivityLogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyActivityLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
