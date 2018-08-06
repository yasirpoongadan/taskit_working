import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgressGraphComponent } from './user-progress-graph.component';

describe('UserProgressGraphComponent', () => {
  let component: UserProgressGraphComponent;
  let fixture: ComponentFixture<UserProgressGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProgressGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgressGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
