import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTimeExtensionRequestComponent } from './company-time-extension-request.component';

describe('CompanyTimeExtensionRequestComponent', () => {
  let component: CompanyTimeExtensionRequestComponent;
  let fixture: ComponentFixture<CompanyTimeExtensionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTimeExtensionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTimeExtensionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
