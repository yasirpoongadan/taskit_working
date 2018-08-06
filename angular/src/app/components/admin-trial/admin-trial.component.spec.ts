import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrialComponent } from './admin-trial.component';

describe('AdminTrialComponent', () => {
  let component: AdminTrialComponent;
  let fixture: ComponentFixture<AdminTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
