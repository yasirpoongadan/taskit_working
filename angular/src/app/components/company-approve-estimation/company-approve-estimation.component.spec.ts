import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApproveEstimationComponent } from './company-approve-estimation.component';

describe('CompanyApproveEstimationComponent', () => {
  let component: CompanyApproveEstimationComponent;
  let fixture: ComponentFixture<CompanyApproveEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyApproveEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyApproveEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
