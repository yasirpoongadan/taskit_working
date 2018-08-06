import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // console.log($(window).height());
    // var footerHeight = $('.site-footer').height();
    // var contHeight = ($(window).height() - footerHeight -80) ;

    // $('.user-dashboard').css('min-height', contHeight +'px');
  }

}
