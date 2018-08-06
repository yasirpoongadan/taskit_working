import { Injectable } from '@angular/core';

@Injectable()
export class OverlayNotifcountService {

  notifReadCount = 0;
  inc(){
    this.notifReadCount++;
  }

}
