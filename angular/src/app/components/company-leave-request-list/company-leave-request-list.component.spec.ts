import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLeaveRequestListComponent } from './company-leave-request-list.component';

describe('CompanyLeaveRequestListComponent', () => {
  let component: CompanyLeaveRequestListComponent;
  let fixture: ComponentFixture<CompanyLeaveRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLeaveRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLeaveRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
