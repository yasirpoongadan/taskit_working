import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProjectCategoryComponent } from './company-project-category.component';

describe('CompanyProjectCategoryComponent', () => {
  let component: CompanyProjectCategoryComponent;
  let fixture: ComponentFixture<CompanyProjectCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProjectCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProjectCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
