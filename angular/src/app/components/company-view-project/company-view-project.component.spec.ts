import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewProjectComponent } from './company-view-project.component';

describe('CompanyViewProjectComponent', () => {
  let component: CompanyViewProjectComponent;
  let fixture: ComponentFixture<CompanyViewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyViewProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
