import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManageDesignationComponent } from './company-manage-designation.component';

describe('CompanyManageDesignationComponent', () => {
  let component: CompanyManageDesignationComponent;
  let fixture: ComponentFixture<CompanyManageDesignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManageDesignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManageDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
