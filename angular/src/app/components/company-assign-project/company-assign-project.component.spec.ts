import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAssignProjectComponent } from './company-assign-project.component';

describe('CompanyAssignProjectComponent', () => {
  let component: CompanyAssignProjectComponent;
  let fixture: ComponentFixture<CompanyAssignProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAssignProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAssignProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
