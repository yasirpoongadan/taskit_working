import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatusGraphComponent } from './user-status-graph.component';

describe('UserStatusGraphComponent', () => {
  let component: UserStatusGraphComponent;
  let fixture: ComponentFixture<UserStatusGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatusGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatusGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
