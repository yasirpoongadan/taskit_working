import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyResoureVsHourComponent } from './company-resoure-vs-hour.component';

describe('CompanyResoureVsHourComponent', () => {
  let component: CompanyResoureVsHourComponent;
  let fixture: ComponentFixture<CompanyResoureVsHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyResoureVsHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyResoureVsHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
