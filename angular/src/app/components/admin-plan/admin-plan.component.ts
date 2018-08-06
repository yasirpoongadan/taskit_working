import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-plan',
  templateUrl: './admin-plan.component.html',
  styleUrls: ['./admin-plan.component.css']
})
export class AdminPlanComponent implements OnInit {
  displayedColumns = ['slno', 'plan_name', 'plan_price', 'bestvalue', 'action'];
  dataSource: MatTableDataSource<any>;
  notExist = false;
  id: any;
  planId: any;
  numofsurvey: any;
  numofqtn: any;
  numofsurveyattn: any;
  disablePrice: boolean = false;
  showSpinner: boolean = false;
  showSpinnerDelete: boolean = false;
  reachMaxPlan: boolean = false;

  plan = {
    plan_name: '',
    plan_price: '',
    no_projects: '',
    no_members: '',
    no_modules: '',
    no_tasks: '',
    noprojects: '',
    nomembers: '',
    nomodules: '',
    notasks: '',
  };
  newPlan = {
    plan_name: '',
    plan_price: '',
    no_projects: '',
    no_members: '',
    no_modules: '',
    no_tasks: '',
    value1: '',
    value2: '',
    value3: '',
    value4: ''
  }
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selected: any;
  constructor(private adminService: AdminService, private routes: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPlan();
  }

  getPlan() {
    this.reachMaxPlan = false;
    const users = [];
    // ---------------------------------Start-------------------------------------------
    // Function      : get all plans
    // Params        : 
    // Returns       : 
    // Author        : Rinsha
    // Date          : 05-03-2018
    // Last Modified : 05-03-2018, Rinsha
    // Desc          : getAllplans 
    this.adminService.getAllplans().subscribe(data => {
      this.showSpinnerDelete = false;
      // console.log(data);
      if (data.length == 0) {
        this.notExist = true;
      }
      if (data.length == "4") {
        this.reachMaxPlan = true;
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // ---------------------------------End-------------------------------------------
  }
  // ---------------------------------Start-------------------------------------------
  // Function      : add plan
  // Params        : data from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : add plan 
  // console.log(plan);
  addPlan(plan) {
    if (this.newPlan.no_projects == 'limited' && this.newPlan.value1 == '') {
      let snackBarRef = this.snackBar.open('No of project is required ', '', {
        duration: 3000
      });

    } else if (this.newPlan.no_members == 'limited' && this.newPlan.value2 == '') {
      let snackBarRef = this.snackBar.open('No of members is required ', '', {
        duration: 3000
      });
    } else if (this.newPlan.no_modules == 'limited' && this.newPlan.value3 == '') {
      let snackBarRef = this.snackBar.open('No of modules is required', '', {
        duration: 3000
      });
    } else if (this.newPlan.no_tasks == 'limited' && this.newPlan.value4 == '') {
      let snackBarRef = this.snackBar.open('No of tasks is required ', '', {
        duration: 3000
      });
    }

    else {
      this.adminService.addPlan(plan).subscribe(data => {
        if (data.success == true) {
          let snackBarRef = this.snackBar.open(data.msg, '', {
            duration: 3000
          });
          this.closeBtn.nativeElement.click();
          this.getPlan();
          this.newPlan = {
            plan_name: '',
            plan_price: '',
            no_projects: '',
            no_members: '',
            no_modules: '',
            no_tasks: '',
            value1: '',
            value2: '',
            value3: '',
            value4: ''
          }
        }
        else {
          let snackBarRef = this.snackBar.open(data.msg, '', {
            duration: 3000
          });
        }
      });
    }


    // ---------------------------------End-------------------------------------------
  }

  updatePlan(plan) {

    console.log(plan)
    if (this.plan.noprojects == 'limited' && (this.plan.no_projects == null || this.plan.no_projects == 'Unlimited'))  {
      let snackBarRef = this.snackBar.open('No of project is required ', '', {
        duration: 3000
      });

    } else if (this.plan.nomembers == 'limited' && (this.plan.no_members == null || this.plan.no_members =='Unlimited')) {
      let snackBarRef = this.snackBar.open('No of members is required ', '', {
        duration: 3000
      });
    } else if (this.plan.nomodules == 'limited' && (this.plan.no_modules == null || this.plan.no_modules == 'Unlimited')) {
      let snackBarRef = this.snackBar.open('No of modules is required', '', {
        duration: 3000
      });
    } else if (this.plan.notasks == 'limited' && (this.plan.no_tasks == null || this.plan.no_tasks =='Unlimited')) {
      let snackBarRef = this.snackBar.open('No of tasks is required ', '', {
        duration: 3000
      });
    }

    else {
    this.adminService.updatePlan(plan).subscribe(data => {
      if (data.success == true) {
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 3000
        });
        this.closeBtn1.nativeElement.click();
        this.newPlan = {
          plan_name: '',
          plan_price: '',
          no_projects: '',
          no_members: '',
          no_modules: '',
          no_tasks: '',
          value1: '',
          value2: '',
          value3: '',
          value4: ''
        };
        this.getPlan();
      }
      else {
        let snackBarRef = this.snackBar.open(data.msg, '', {
          duration: 3000
        });
      }
    });

  }


  }


  // } else if (this.plan.no_members == 'limited' && this.plan.value2 == '') {
  //   let snackBarRef = this.snackBar.open('No of members is required ', '', {
  //     duration: 3000
  //   });
  // } else if (this.plan.no_modules == 'limited' && this.plan.value3 == '') {
  //   let snackBarRef = this.snackBar.open('No of modules is required', '', {
  //     duration: 3000
  //   });
  // } else if (this.plan.no_tasks == 'limited' && this.plan.value4 == '') {
  //   let snackBarRef = this.snackBar.open('No of tasks is required ', '', {
  //     duration: 3000
  //   });
  // }



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onChange(id, value) {
    // ---------------------------------Start-------------------------------------------
    // Function      : best plan
    // Params        : id and value
    // Returns       : 
    // Author        : Rinsha
    // Date          : 07-03-2018
    // Last Modified : 07-03-2018, Rinsha
    // Desc          : to change a plan to best
    this.adminService.bestPlan(id, value).subscribe(data2 => {
      if (data2.success == true) {
        this.getPlan();
      }
      else {
      }
    });
    // ---------------------------------End-------------------------------------------
  }

  deletePlan(id) {
    // console.log(id);
    // ---------------------------------Start-------------------------------------------
    // Function      : delete plan
    // Params        : id 
    // Returns       : 
    // Author        : Rinsha
    // Date          : 07-03-2018
    // Last Modified : 07-03-2018, Rinsha
    // Desc          : to delete a plan which is'nt used by any company
    this.adminService.deletePlan(id).subscribe(data2 => {
      if (data2.success == true) {
        let snackBarRef = this.snackBar.open(data2.msg, '', {
          duration: 2000
        });
        this.getPlan();
      }
      else {
        let snackBarRef = this.snackBar.open(data2.msg, '', {
          duration: 2000
        });
      }
    });
    // ---------------------------------End-------------------------------------------
  }

  getId(id) {
    this.planId = id;
  }

  getEditId(id) {
    // ---------------------------------Start-------------------------------------------
    // Function      : get plan by id
    // Params        : id
    // Returns       : plan
    // Author        : Rinsha
    // Date          : 07-03-2018
    // Last Modified : 07-03-2018, Rinsha
    // Desc          : getplan
    this.adminService.getPlan(id).subscribe(res => {
      // console.log(res);
      this.disablePrice = false;
      this.plan = res;
    
      this.plan.noprojects = (res.no_projects != 'Unlimited') ? "limited" : "Unlimited";
      this.plan.nomembers = (res.no_members != 'Unlimited') ? "limited" : "Unlimited";
      this.plan.nomodules = (res.no_modules != 'Unlimited') ? "limited" : "Unlimited";
      this.plan.notasks = (res.no_tasks != 'Unlimited') ? "limited" : "Unlimited";
      console.log(res.is_defualt)
      if (res.is_defualt == true) {
        this.disablePrice = true;
      }
    });
    // ---------------------------------End-------------------------------------------
  }


  // if(plan.notasks == "limited"){
    
  //   var x = plan.no_tasks;
  //   plan.no_tasks = +x;
  // }
  // if(plan.nomodules == "limited"){
  //   var y = plan.nomodules;
  //   plan.no_modules = +y;
  // }
  // if(plan.nomembers == "limited"){
  //   // var z = plan.no_members;
  //   // plan.no_members = +z;
  // }
  // if(plan.noprojects == "limited"){
  // //   var p = plan.no_projects;
  // //   plan.no_projects = +p;
  // // }
  // // console.log(this.plan.noprojects);
  // // console.log(typeof (plan.no_projects))
  // // console.log(plan.no_projects)

  // if (plan.noprojects == 'limited' && plan.no_projects !== 'Unlimited' && plan.no_projects !== 'limited' && plan.no_project == '') {
  //   let snackBarRef = this.snackBar.open('No of project is required ', '', {
  //     duration: 3000
  //   });

  // } else if (plan.nomembers == 'limited' && typeof (plan.no_members) !== 'number') {
  //   let snackBarRef = this.snackBar.open('No of members is required ', '', {
  //     duration: 3000
  //   });
  // } else if (plan.nomodules == 'limited' && typeof (plan.no_modules) !== 'number') {
  //   let snackBarRef = this.snackBar.open('No of modules is required', '', {
  //     duration: 3000
  //   });
  // } else if (plan.notasks == 'limited'  && typeof (plan.no_tasks) !== 'number') {
  //   let snackBarRef = this.snackBar.open('No of task is required ', '', {
  //     duration: 3000
  //   });
  // }

  // //  if ((plan.notasks == "limited" && typeof (plan.no_tasks) !== 'number') || (plan.nomodules == "limited" && typeof (plan.no_modules) !== 'number') || (plan.nomembers == "limited" && typeof (plan.no_members) !== 'number') || (plan.noprojects == "limited" && typeof (plan.no_projects) !== 'number')) {
  // //   let snackBarRef = this.snackBar.open("All fields are required", '', {
  // //     duration: 3000
  // //   });

  // // }
  // //  if (plan.plan_name == '' || plan.plan_price == '') {
  // //   let snackBarRef = this.snackBar.open('All fields are required ', '', {
  // //     duration: 3000
  // //   });
  // // }
  // else {
  // ---------------------------------Start-------------------------------------------
  // Function      : update plan
  // Params        : value from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 04-04-2018, Rinsha
  // Desc          : update a plan
  //   updatePlan(plan) {
  //   console.log(plan)
  //   this.adminService.updatePlan(plan).subscribe(data => {
  //     if (data.success == true) {
  //       let snackBarRef = this.snackBar.open(data.msg, '', {
  //         duration: 3000
  //       });
  //       this.closeBtn1.nativeElement.click();
  //       this.newPlan = {
  //         plan_name: '',
  //         plan_price: '',
  //         no_projects: '',
  //         no_members: '',
  //         no_modules: '',
  //         no_tasks: '',
  //         value1: '',
  //         value2: '',
  //         value3: '',
  //         value4: ''
  //       };
  //       this.getPlan();
  //     }
  //     else {
  //       let snackBarRef = this.snackBar.open(data.msg, '', {
  //         duration: 3000
  //       });
  //     }
  //   });
  // }
  // ---------------------------------End-------------------------------------------
  // }


}
