import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTaskVsStatusComponent } from './company-task-vs-status.component';

describe('CompanyTaskVsStatusComponent', () => {
  let component: CompanyTaskVsStatusComponent;
  let fixture: ComponentFixture<CompanyTaskVsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTaskVsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTaskVsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
