import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyRequestComponent } from './user-my-request.component';

describe('UserMyRequestComponent', () => {
  let component: UserMyRequestComponent;
  let fixture: ComponentFixture<UserMyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
