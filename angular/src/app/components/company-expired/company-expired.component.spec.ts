import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyExpiredComponent } from './company-expired.component';

describe('CompanyExpiredComponent', () => {
  let component: CompanyExpiredComponent;
  let fixture: ComponentFixture<CompanyExpiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyExpiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
