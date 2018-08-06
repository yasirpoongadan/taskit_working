import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProgressGraphComponent } from './company-progress-graph.component';

describe('CompanyProgressGraphComponent', () => {
  let component: CompanyProgressGraphComponent;
  let fixture: ComponentFixture<CompanyProgressGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProgressGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProgressGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
