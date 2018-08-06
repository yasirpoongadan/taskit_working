import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditProjectComponent } from './company-edit-project.component';

describe('CompanyEditProjectComponent', () => {
  let component: CompanyEditProjectComponent;
  let fixture: ComponentFixture<CompanyEditProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEditProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
