import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPlanlistComponent } from './company-planlist.component';

describe('CompanyPlanlistComponent', () => {
  let component: CompanyPlanlistComponent;
  let fixture: ComponentFixture<CompanyPlanlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPlanlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPlanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
