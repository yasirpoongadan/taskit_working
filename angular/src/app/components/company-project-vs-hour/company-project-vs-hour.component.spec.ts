import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProjectVsHourComponent } from './company-project-vs-hour.component';

describe('CompanyProjectVsHourComponent', () => {
  let component: CompanyProjectVsHourComponent;
  let fixture: ComponentFixture<CompanyProjectVsHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProjectVsHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProjectVsHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
