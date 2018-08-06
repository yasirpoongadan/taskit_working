import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProjectComponent } from './company-project.component';

describe('CompanyProjectComponent', () => {
  let component: CompanyProjectComponent;
  let fixture: ComponentFixture<CompanyProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
