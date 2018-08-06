import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { OverlayNotifcountService } from '../../services/overlay-notifcount.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import * as socketIo from 'socket.io-client';
declare var $: any;
import { Config } from './../../config/config';

@Component({
  selector: 'company-topbar',
  templateUrl: './company-topbar.component.html',
  styleUrls: ['./company-topbar.component.css']
})
export class CompanyTopbarComponent implements OnInit {
  count: number = 0;
  countOverlay: number = 0;
  project: any;
  approveProject: any;
  estimationApproval: any;
  planProject: any;
  resubmitEstimation: any;
  profile :any;
  user_id :any;
  entity: any;
  userpendingdata: any;
  adminnotifdata: any;
  timeextreqdata=[];
  upgradeBtnShow: Boolean = true;
  assignHeadCount: number = 0;
  approveEstimationCount: number = 0;
  approveProjectCount: number = 0;
  planProjectCount: number = 0;
  resubmitEstimationCount: number = 0;
  userpendingdataCount: number = 0;
  adminnotifdataCount: number = 0;
  timeextreqdataCount: number = 0;
  // entity:any;
  notifications: any;
  showNotifications = false;
  newTaskreq: any;
  newTaskApp: any;
  newTaskreqCount = 0;
  newTaskreqBackCount = 0;
  timeExtensionCount = 0;
  projVerfNotif: any;
  projVerfNotifCount = 0;

  private socket: any;
  dispStatus = true;
  overlaynotfSrv:any;
  constructor(
    private companyService: CompanyService,
    private routes: Router,
    public snackBar: MatSnackBar,
    public overlaynotf: OverlayNotifcountService,

    private config: Config ) {
    this.socket = socketIo(config.socketURL);
    this.overlaynotfSrv = overlaynotf;
  }
  // overlaynotfCount.notifReadCount = 0;
  closeoverlayNotif(msg,ref_id){
    console.log(this.overlaynotfSrv.notifReadCount);
    this.overlaynotfSrv.inc();
    console.log(this.overlaynotfSrv.notifReadCount);
    this.companyService.saveActivityLog({msg:msg,ref_id:ref_id}).subscribe(data => {

    });
  }
  ngOnInit() {
    $('#newNotif').click();
    $('#newNotif').click();
    $('#newNotif').click();
    // ---------------------------------Start-------------------------------------------
    // Function      : Get logged in entity
    // Params        : 
    // Returns       : Get logged in entity
    // Author        : Rinsha
    // Date          : 08-03-2018
    // Last Modified : 08-03-2018, Rinsha
    // Desc          :  

    this.companyService.getLoggedinEntity().subscribe(data => {

      if(data == null || data == '' || data ==[] || (data!== undefined && data.length == 0 ) )
      {
        this.routes.navigate(['/home']); 
      }
      if(data.role_id == 2){
        //super admin
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/home']); 
        }
        this.routes.navigate(['/admin-dashboard']);
      }
      if(data.role_id == 3 || data.role_id == 1){
        //company admin or pm
        if(data.delete_status == true || data.block_status == true || data.cmp_status == "Not Verified"){
          this.routes.navigate(['/company-login']); 
        }
        if(data.cmp_status == "Expired"){
          this.routes.navigate(['/expired']);
        }
        if(data.is_profile_completed == false){
          this.routes.navigate(['/compay-aditninfo', data.cmp_id]);
        }
        // this.routes.navigate(['/company-dashboard']);
      }
      if(data.role_id == 4){
        //user
        if(data.delete_status == true || data.block_status == true){
          this.routes.navigate(['/company-login']); 
        }
        this.routes.navigate(['/user-dashboard']);
      }
    });
    // -----------------------------------End------------------------------------------
    this.getLoggedDetails();
    this.getNotifications();
   
    this.count = 0;
    this.assignHeadNotification();
    this.socket.on('addProject', (data) => {
      this.assignHeadNotification();
    });
    this.approveEstimationNotification();
    this.socket.on('approveEstimation', (data) => {
      this.approveEstimationNotification();
    });
    this.approveProjectNotification();
    this.socket.on('approveProject', (data) => {
      this.approveProjectNotification();
    });
    this.planProjectNotification();
    this.socket.on('planProject', (data) => {
      this.planProjectNotification();
    });
    this.resubmitEstimationNotification();
    this.socket.on('reEstimateProject', (data) => {
      this.resubmitEstimationNotification();
    });
    this.socket.on('newtaskrequestAccepted', (data) => {
      this.getNotifications();
    });
    this.socket.on('newtaskrequestRejected', (data) => {
      this.getNotifications();
    });
    this.socket.on('newtaskrequestApproval', (data) => {
      this.getNotifications();
    });

    this.getAllemppendingleavesnotifi();
    this.socket.on('Leaveaddeduser', (data) => {
      this.getAllemppendingleavesnotifi();
    });
    this.socket.on('userstatuschange', (data) => {
      this.getAllemppendingleavesnotifi();
    });
    this.getAllSendtoadminnotif();
    this.socket.on('adminviewstatuschange', (data) => {
      this.getAllSendtoadminnotif();
    });
    this.socket.on('sendtoadmin', (data) => {
      this.getAllSendtoadminnotif();
    });
    this.socket.on('timeextention', (data) => {
      this.gettimeextentionNotifications();
    });
    this.socket.on('newtaskrequest', (data) => {
      this.getNotifications();
    });
    this.socket.on('notfificationclosed', (data) => {
      this.getNotifications();
    });
    this.getProfile();
    this.getProjectApproveNotifications();
  }
  assignHeadNotification() {
    // ---------------------------------Start-------------------------------------------
    // Function      : get assignHeadNotification
    // Params        : 
    // Returns       : project data
    // Author        : Rinsha
    // Date          : 12-03-2018
    // Last Modified : 12-03-2018, Rinsha
    // Desc          : check whether the loggedin project manager assigned for a project. If yes, then notification to assign team heads
    this.companyService.assignHeadNotification().subscribe(res => {
      console.log('yasir');
      console.log(res);
      this.project = res;
      this.assignHeadCount = 0;
      this.assignHeadCount = this.project.length;
      this.refresh();
    });
    // ---------------------------------End-------------------------------------------
  }
  logout() {
    this.companyService.logout();
    this.routes.navigate(['/home']);
    return false;
  }
  approveEstimationNotification() {
    // ---------------------------------Start-------------------------------------------
    // Function      : get approveEstimationNotification
    // Params        : 
    // Returns       : notification data
    // Author        : Rinsha
    // Date          : 14-03-2018
    // Last Modified : 14-03-2018, Rinsha
    // Desc          : check whether the loggedin project manager have pending estimation approval notification
    this.companyService.approveEstimationNotification().subscribe(res => {
      this.estimationApproval = res;
      this.approveEstimationCount = 0;
      this.approveEstimationCount = this.estimationApproval.length;
      this.refresh();
    });
    // ---------------------------------End-------------------------------------------
  }
  closeNotif(notif_id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of estimation approval
    // Params        : notification id
    // Returns       : 
    // Author        : Rinsha
    // Date          : 14-03-2018
    // Last Modified : 14-03-2018, Rinsha
    // Desc          : close notification when pm sees the estimation approval notification
    this.companyService.closeNotif(notif_id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.assignHeadNotification();
    });
    // ---------------------------------End-------------------------------------------
  }
  closeNotif2(notif_id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of estimation approval
    // Params        : notification id
    // Returns       : 
    // Author        : Rinsha
    // Date          : 14-03-2018
    // Last Modified : 14-03-2018, Rinsha
    // Desc          : close notification when pm sees the estimation approval notification
    this.companyService.closeNotif2(notif_id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.approveEstimationNotification();
    });
    // ---------------------------------End-------------------------------------------
  }

  approveProjectNotification() {
    // ---------------------------------Start-------------------------------------------
    // Function      : get apprroveProjectNotification
    // Params        : 
    // Returns       : project data
    // Author        : Rinsha
    // Date          : 19-03-2018
    // Last Modified : 19-03-2018, Rinsha
    // Desc          : check whether the loggedin company admin have any project to approves
    this.companyService.approveProjectNotification().subscribe(res => {
      // console.log(res)
      this.approveProject = res;
      this.approveProjectCount = 0;
      this.approveProjectCount = this.approveProject.length;
      this.refresh();
    });
    // ---------------------------------End-------------------------------------------
  }

  closeNotif3(p_id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of project approval
    // Params        : project id
    // Returns       : 
    // Author        : Rinsha
    // Date          : 19-03-2018
    // Last Modified : 19-03-2018, Rinsha
    // Desc          : close notification when pm sees the project approval notification
    this.companyService.closeNotif3(p_id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.approveProjectNotification();
    });
    // ---------------------------------End-------------------------------------------
  }

  planProjectNotification() {
    // ---------------------------------Start-------------------------------------------
    // Function      : get planProjectNotification
    // Params        : 
    // Returns       : project data
    // Author        : Rinsha
    // Date          : 20-03-2018
    // Last Modified : 20-03-2018, Rinsha
    // Desc          : check whether the loggedin pm have any project to plan
    this.companyService.planProjectNotification().subscribe(res => {
      // console.log(res)
      this.planProject = res;
      this.planProjectCount = 0;
      this.planProjectCount = this.planProject.length;
      this.refresh();
    });
    // ---------------------------------End-------------------------------------------
  }

  closeNotif4(p_id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of project plan
    // Params        : project id
    // Returns       : 
    // Author        : Rinsha
    // Date          : 19-03-2018
    // Last Modified : 19-03-2018, Rinsha
    // Desc          : close notification when pm sees the project plan notification
    this.companyService.closeNotif4(p_id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.planProjectNotification();
    });
    // ---------------------------------End-------------------------------------------
  }

  resubmitEstimationNotification() {
    // ---------------------------------Start-------------------------------------------
    // Function      : get resubmitEstimationNotification
    // Params        : 
    // Returns       : project data
    // Author        : Rinsha
    // Date          : 20-03-2018
    // Last Modified : 20-03-2018, Rinsha
    // Desc          : check whether the loggedin pm have any estimation to resubmit
    this.companyService.resubmitEstimationNotification().subscribe(res => {
      // console.log(res)
      this.resubmitEstimation = res;
      this.resubmitEstimationCount = 0;
      this.resubmitEstimationCount = this.resubmitEstimation.length;
      this.refresh();
    });
    // ---------------------------------End-------------------------------------------
  }
  // ---------------------------------Start-------------------------------------------
  // Function      : Get logged in entity
  // Params        : 
  // Returns       : Get logged in entity
  // Author        : Rinsha
  // Date          : 08-03-2018
  // Last Modified : 08-03-2018, Rinsha
  // Desc          :  
  getLoggedDetails() {
    this.companyService.getLoggedinEntity().subscribe(data => {
      this.entity = data;
      if (this.entity.role_id == 3) {
        this.upgradeBtnShow = false;
      }
    });
  }

  // -----------------------------------End------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Manu Prasad 
  // Desc          : Get Teams from database

  getNotifications() {
    this.companyService.getNotifications().subscribe(resNotifications => {
      // this.accessRights = accessRights;
      // console.log(resNotifications)
      this.notifications = resNotifications;
      if (resNotifications.back && resNotifications.back.length > 0) {
        // if (resNotifications.back.length > 0) {
        this.newTaskreqBackCount = resNotifications.back.length
        this.newTaskApp = resNotifications.back
        this.dispStatus = true;
      } else {
        this.newTaskApp = [];
        this.dispStatus = true;
      }
      if (resNotifications.req && resNotifications.req.length > 0) {
        // if (resNotifications.req.length > 0) {
        this.newTaskreqCount = resNotifications.req.length
        this.newTaskreq = resNotifications.req
        this.dispStatus = true;

      } else {
        this.newTaskreq = [];
        this.dispStatus = true;

      }
      this.showNotifications = true;
      this.refresh();
    });
  }
  //  ---------------------------------end-----------------------------------------------
  getAllemppendingleavesnotifi() {
    // ---------------------------------Start-------------------------------------------
    // Function      :  getAllemppendingleavesnotifi
    // Params        : 
    // Returns       : notification data
    // Author        : sudha
    // Date          : 29-03-2018
    // Last Modified : 
    // Desc          : check user leave request
    this.companyService.getAllemppendingleavesnotifi().subscribe(res => {
      // console.log(res)
      this.userpendingdata = res;
      this.userpendingdataCount = 0;
      this.userpendingdataCount = this.userpendingdata.length;
      // console.log( this.userpendingdata);
      this.refresh();
    });
    // ---------------------------------End-------------------------------------------
  }

  closeNotif5(notif_id) {
    // console.log(notif_id);
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of estimation approval
    // Params        : notification id
    // Returns       : 
    // Author        : sudha
    // Date          : 29-03-2018
    // Last Modified : 
    // Desc          : close notification user leave request
    this.companyService.closeNotif5(notif_id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.getAllemppendingleavesnotifi();
    });
    // ---------------------------------End-------------------------------------------
  }
  getAllSendtoadminnotif() {
    // ---------------------------------Start-------------------------------------------
    // Function      :  getAllSendtoadminnotif
    // Params        : 
    // Returns       : notification data
    // Author        : sudha
    // Date          : 06-03-2018
    // Last Modified : 
    // Desc          : admin approval for time extension
    this.companyService.getAllSendtoadminnotif().subscribe(res => {
      // console.log(res);
      if (res != "no data") {
        this.adminnotifdata = res;
        this.adminnotifdataCount = 0;
        this.adminnotifdataCount = this.adminnotifdata.length;
        // console.log( this.adminnotifdata);
        this.refresh();
      }
    });
    // ---------------------------------End-------------------------------------------
  }

  closeNotif6(notif_id) {
    // console.log(notif_id);
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of estimation approval
    // Params        : notification id
    // Returns       : 
    // Author        : sudha
    // Date          : 29-03-2018
    // Last Modified : 
    // Desc          : close notification user leave request
    this.companyService.closeNotif6(notif_id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.getAllSendtoadminnotif();
    });
    // ---------------------------------End-------------------------------------------
  }

  refresh() {
    this.count = 0;
    this.countOverlay = 0;
    this.count = this.assignHeadCount + this.approveEstimationCount + this.approveProjectCount + this.planProjectCount + this.resubmitEstimationCount + this.newTaskreqBackCount + this.newTaskreqCount
      + this.userpendingdataCount + this.adminnotifdataCount+this.timeextreqdataCount + this.projVerfNotifCount;
    this.countOverlay = this.assignHeadCount + this.approveEstimationCount + this.approveProjectCount + this.planProjectCount + this.resubmitEstimationCount + this.newTaskreqBackCount + this.newTaskreqCount
      + this.adminnotifdataCount+this.timeextreqdataCount + this.projVerfNotifCount;
  }



  closeNotifReq(id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of new request
    // Params        : project id
    // Returns       : 
    // Author        : MANU PRASAD
    // Date          : 29-03-2018
    // Last Modified : 29-03-2018, Rinsha
    // Desc          : close notification when pm sees the new request notification
    this.companyService.closeNotifnewTaskReq(id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.getNotifications();
      this.routes.navigateByUrl('/company-task-manage/' + id);
    });
    // ---------------------------------End-------------------------------------------
  }

  closeNotifAproval(id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : close notification of new request
    // Params        : project id
    // Returns       : 
    // Author        : MANU PRASAD
    // Date          : 29-03-2018
    // Last Modified : 29-03-2018, Rinsha
    // Desc          : close notification when pm sees the new request notification
    this.companyService.closeNotifAproval(id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.getNotifications();
    });
    // ---------------------------------End-------------------------------------------
  }

  gettimeextentionNotifications() {
    // ---------------------------------Start-------------------------------------------
    // Function      :  gettimeextentionNotifications
    // Params        : 
    // Returns       : notification data
    // Author        :  manu
    // Date          : 29-03-2018
    // Last Modified : 
    // Desc          : check  request
    this.companyService.gettimeextentionNotifications().subscribe(res => {
      // console.log("kdddddddkkk")
      // console.log(res)
      // res.req.forEach(element => {
      //   console.log(element.xt.tbl_project_task.tbl_project_module.project_id)
      // });
      // console.log("kdddddddkkk")
      this.timeextreqdata = res.req;
      // this.timeextreqdataCount = 0;
      this.timeextreqdataCount = this.timeextreqdata.length;
      // console.log( this.userpendingdata);
      this.refresh();
    });
    // ---------------------------------End-------------------------------------------
  }

   // ---------------------------------End-------------------------------------------
  closeNotif9(notif_id) {
    // console.log(notif_id);
    // ---------------------------------Start-------------------------------------------
    // Function      : gettimeextentionNotifications
    // Params        : notification id
    // Returns       : 
    // Author        : manu
    // Date          : 29-03-2018
    // Last Modified : 
    // Desc          : close notification user leave request
    this.companyService.closeNotif9(notif_id).subscribe(res => {
      if (res.success == false) {
        let snackBarRef = this.snackBar.open(res.msg, '', {
          duration: 3000
        });
      }
      this.gettimeextentionNotifications();
    });
  } 
   // ---------------------------------End-------------------------------------------
  
  getProfile() {
    // ---------------------------------Start-------------------------------------------
    // Function      : getProfile
    // Params        : 
    // Returns       : logged in user details
    // Author        : Rinsha
    // Date          : 21-03-2018
    // Last Modified : 21-03-2018, Rinsha
    // Desc          : 
    this.companyService.getProfile().subscribe(info => {
      this.profile = info;
   
      this.user_id = info.id;
    });
  }

  // ---------------------------------Start-------------------------------------------
  // Function      : getProjectApproveNotifications
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan 
  // Date          : 03-08-2018
  // Last Modified : 03-08-2018, Yasir Poongadan
  // Desc          : 
  getProjectApproveNotifications() {

    this.companyService.getProjectApproveNotifications().subscribe(res => {
        this.projVerfNotif = res;
        this.projVerfNotifCount = this.projVerfNotif.length;
        this.refresh();
    });
    
  }
  // ---------------------------------End-------------------------------------------



}
