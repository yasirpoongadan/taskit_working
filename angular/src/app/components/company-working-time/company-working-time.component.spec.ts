import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyWorkingTimeComponent } from './company-working-time.component';

describe('CompanyWorkingTimeComponent', () => {
  let component: CompanyWorkingTimeComponent;
  let fixture: ComponentFixture<CompanyWorkingTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyWorkingTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyWorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
