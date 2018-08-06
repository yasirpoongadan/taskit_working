import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompayAditninfoComponent } from './compay-aditninfo.component';

describe('CompayAditninfoComponent', () => {
  let component: CompayAditninfoComponent;
  let fixture: ComponentFixture<CompayAditninfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompayAditninfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompayAditninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
