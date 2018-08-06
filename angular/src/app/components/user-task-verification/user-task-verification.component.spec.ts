import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskVerificationComponent } from './user-task-verification.component';

describe('UserTaskVerificationComponent', () => {
  let component: UserTaskVerificationComponent;
  let fixture: ComponentFixture<UserTaskVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTaskVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTaskVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
