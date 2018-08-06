import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManageTeamComponent } from './company-manage-team.component';

describe('CompanyManageTeamComponent', () => {
  let component: CompanyManageTeamComponent;
  let fixture: ComponentFixture<CompanyManageTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyManageTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyManageTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
