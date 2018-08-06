import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApproveProjectComponent } from './company-approve-project.component';

describe('CompanyApproveProjectComponent', () => {
  let component: CompanyApproveProjectComponent;
  let fixture: ComponentFixture<CompanyApproveProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyApproveProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyApproveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
