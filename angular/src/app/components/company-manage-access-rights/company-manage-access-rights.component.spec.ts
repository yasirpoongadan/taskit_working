import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManageAccessRightsComponent } from './company-manage-access-rights.component';

describe('CompanyManageAccessRightsComponent', () => {
  let component: CompanyManageAccessRightsComponent;
  let fixture: ComponentFixture<CompanyManageAccessRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManageAccessRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManageAccessRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
