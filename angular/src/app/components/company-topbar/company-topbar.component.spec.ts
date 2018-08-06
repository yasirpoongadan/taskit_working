import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTopbarComponent } from './company-topbar.component';

describe('CompanyTopbarComponent', () => {
  let component: CompanyTopbarComponent;
  let fixture: ComponentFixture<CompanyTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
