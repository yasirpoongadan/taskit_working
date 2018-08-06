import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStatusGraphComponent } from './company-status-graph.component';

describe('CompanyStatusGraphComponent', () => {
  let component: CompanyStatusGraphComponent;
  let fixture: ComponentFixture<CompanyStatusGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStatusGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStatusGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
