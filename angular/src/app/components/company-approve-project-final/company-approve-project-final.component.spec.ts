import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApproveProjectFinalComponent } from './company-approve-project-final.component';

describe('CompanyApproveProjectFinalComponent', () => {
  let component: CompanyApproveProjectFinalComponent;
  let fixture: ComponentFixture<CompanyApproveProjectFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyApproveProjectFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyApproveProjectFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
