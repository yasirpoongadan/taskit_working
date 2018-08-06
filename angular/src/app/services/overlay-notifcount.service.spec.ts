import { TestBed, inject } from '@angular/core/testing';

import { OverlayNotifcountService } from './overlay-notifcount.service';

describe('OverlayNotifcountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverlayNotifcountService]
    });
  });

  it('should be created', inject([OverlayNotifcountService], (service: OverlayNotifcountService) => {
    expect(service).toBeTruthy();
  }));
});
