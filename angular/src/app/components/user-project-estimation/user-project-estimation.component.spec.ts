import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectEstimationComponent } from './user-project-estimation.component';

describe('UserProjectEstimationComponent', () => {
  let component: UserProjectEstimationComponent;
  let fixture: ComponentFixture<UserProjectEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
