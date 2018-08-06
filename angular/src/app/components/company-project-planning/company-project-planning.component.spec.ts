import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProjectPlanningComponent } from './company-project-planning.component';

describe('CompanyProjectPlanningComponent', () => {
  let component: CompanyProjectPlanningComponent;
  let fixture: ComponentFixture<CompanyProjectPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProjectPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProjectPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
