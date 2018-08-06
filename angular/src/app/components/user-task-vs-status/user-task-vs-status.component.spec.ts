import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskVsStatusComponent } from './user-task-vs-status.component';

describe('UserTaskVsStatusComponent', () => {
  let component: UserTaskVsStatusComponent;
  let fixture: ComponentFixture<UserTaskVsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTaskVsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTaskVsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
