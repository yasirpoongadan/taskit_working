import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAddProjectComponent } from './company-add-project.component';

describe('CompanyAddProjectComponent', () => {
  let component: CompanyAddProjectComponent;
  let fixture: ComponentFixture<CompanyAddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAddProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
