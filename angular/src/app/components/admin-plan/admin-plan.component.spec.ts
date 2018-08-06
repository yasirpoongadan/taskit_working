import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanComponent } from './admin-plan.component';

describe('AdminPlanComponent', () => {
  let component: AdminPlanComponent;
  let fixture: ComponentFixture<AdminPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
