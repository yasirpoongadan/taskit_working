import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardBarComponent } from './user-dashboard-bar.component';

describe('UserDashboardBarComponent', () => {
  let component: UserDashboardBarComponent;
  let fixture: ComponentFixture<UserDashboardBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDashboardBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
