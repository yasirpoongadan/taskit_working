import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompanyComponent } from './admin-company.component';

describe('AdminCompanyComponent', () => {
  let component: AdminCompanyComponent;
  let fixture: ComponentFixture<AdminCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
