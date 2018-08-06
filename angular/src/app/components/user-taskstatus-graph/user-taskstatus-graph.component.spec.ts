import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskstatusGraphComponent } from './user-taskstatus-graph.component';

describe('UserTaskstatusGraphComponent', () => {
  let component: UserTaskstatusGraphComponent;
  let fixture: ComponentFixture<UserTaskstatusGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTaskstatusGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTaskstatusGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
