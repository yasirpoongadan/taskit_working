import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyActivityLogComponent } from './company-activity-log.component';

describe('CompanyActivityLogComponent', () => {
  let component: CompanyActivityLogComponent;
  let fixture: ComponentFixture<CompanyActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
