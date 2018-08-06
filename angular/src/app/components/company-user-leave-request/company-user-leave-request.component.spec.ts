import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserLeaveRequestComponent } from './company-user-leave-request.component';

describe('CompanyUserLeaveRequestComponent', () => {
  let component: CompanyUserLeaveRequestComponent;
  let fixture: ComponentFixture<CompanyUserLeaveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUserLeaveRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
