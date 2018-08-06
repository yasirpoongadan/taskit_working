import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectReportComponent } from './admin-project-report.component';

describe('AdminProjectReportComponent', () => {
  let component: AdminProjectReportComponent;
  let fixture: ComponentFixture<AdminProjectReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProjectReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
