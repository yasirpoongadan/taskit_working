import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeeLeavesComponent } from './company-employee-leaves.component';

describe('CompanyEmployeeLeavesComponent', () => {
  let component: CompanyEmployeeLeavesComponent;
  let fixture: ComponentFixture<CompanyEmployeeLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEmployeeLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEmployeeLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
