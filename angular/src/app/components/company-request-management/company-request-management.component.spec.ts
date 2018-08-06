import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRequestManagementComponent } from './company-request-management.component';

describe('CompanyRequestManagementComponent', () => {
  let component: CompanyRequestManagementComponent;
  let fixture: ComponentFixture<CompanyRequestManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRequestManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRequestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
