import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNewTaskManagementComponent } from './company-new-task-management.component';

describe('CompanyNewTaskManagementComponent', () => {
  let component: CompanyNewTaskManagementComponent;
  let fixture: ComponentFixture<CompanyNewTaskManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNewTaskManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNewTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
