import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTaskRequestsComponent } from './company-task-requests.component';

describe('CompanyTaskRequestsComponent', () => {
  let component: CompanyTaskRequestsComponent;
  let fixture: ComponentFixture<CompanyTaskRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTaskRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTaskRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
