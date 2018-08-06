import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBarGraphComponent } from './user-bar-graph.component';

describe('UserBarGraphComponent', () => {
  let component: UserBarGraphComponent;
  let fixture: ComponentFixture<UserBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
