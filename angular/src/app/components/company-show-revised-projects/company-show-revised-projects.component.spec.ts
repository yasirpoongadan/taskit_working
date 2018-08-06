import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShowRevisedProjectsComponent } from './company-show-revised-projects.component';

describe('CompanyShowRevisedProjectsComponent', () => {
  let component: CompanyShowRevisedProjectsComponent;
  let fixture: ComponentFixture<CompanyShowRevisedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyShowRevisedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyShowRevisedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
