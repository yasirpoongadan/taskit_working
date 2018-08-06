import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewProjectComponent } from './user-view-project.component';

describe('UserViewProjectComponent', () => {
  let component: UserViewProjectComponent;
  let fixture: ComponentFixture<UserViewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
