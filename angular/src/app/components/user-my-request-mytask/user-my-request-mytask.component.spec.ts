import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyRequestMytaskComponent } from './user-my-request-mytask.component';

describe('UserMyRequestMytaskComponent', () => {
  let component: UserMyRequestMytaskComponent;
  let fixture: ComponentFixture<UserMyRequestMytaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMyRequestMytaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyRequestMytaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
