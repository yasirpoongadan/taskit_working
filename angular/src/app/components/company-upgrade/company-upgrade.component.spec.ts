import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUpgradeComponent } from './company-upgrade.component';

describe('CompanyUpgradeComponent', () => {
  let component: CompanyUpgradeComponent;
  let fixture: ComponentFixture<CompanyUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
