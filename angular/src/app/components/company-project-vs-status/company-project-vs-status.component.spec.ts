import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProjectVsStatusComponent } from './company-project-vs-status.component';

describe('CompanyProjectVsStatusComponent', () => {
  let component: CompanyProjectVsStatusComponent;
  let fixture: ComponentFixture<CompanyProjectVsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProjectVsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProjectVsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
