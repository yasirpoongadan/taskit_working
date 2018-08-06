import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBarGraphComponent } from './company-bar-graph.component';

describe('CompanyBarGraphComponent', () => {
  let component: CompanyBarGraphComponent;
  let fixture: ComponentFixture<CompanyBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
