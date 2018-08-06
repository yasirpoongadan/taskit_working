import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRevisedExecutionPlanComponent } from './company-revised-execution-plan.component';

describe('CompanyRevisedExecutionPlanComponent', () => {
  let component: CompanyRevisedExecutionPlanComponent;
  let fixture: ComponentFixture<CompanyRevisedExecutionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRevisedExecutionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRevisedExecutionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
