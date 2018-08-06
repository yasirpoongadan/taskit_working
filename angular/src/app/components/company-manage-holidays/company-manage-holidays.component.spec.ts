import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManageHolidaysComponent } from './company-manage-holidays.component';

describe('CompanyManageHolidaysComponent', () => {
  let component: CompanyManageHolidaysComponent;
  let fixture: ComponentFixture<CompanyManageHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManageHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManageHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
