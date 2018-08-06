import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHolidayComponent } from './company-holiday.component';

describe('CompanyHolidayComponent', () => {
  let component: CompanyHolidayComponent;
  let fixture: ComponentFixture<CompanyHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
