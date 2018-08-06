import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CompanyService } from './../../services/company.service';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-show-revised-projects',
  templateUrl: './company-show-revised-projects.component.html',
  styleUrls: ['./company-show-revised-projects.component.css']
})
export class CompanyShowRevisedProjectsComponent implements OnInit {

  date :any;
  displayedColumns = ['slno', 'project_name', 'startdate', 'enddate', 'project_cost', 'description', 'action'];
  dataSource: MatTableDataSource<any>;
  notExist = false;
  entity: any;
  Pid: any;
  selected: any;
  loggedin_id: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private companyService: CompanyService, private routes: Router, public snackBar: MatSnackBar ,  private _activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.selected = "all";
    // ---------------------------------Start-------------------------------------------
    // Function      : Get logged in entity
    // Params        : 
    // Returns       : Get logged in entity
    // Author        : Rinsha
    // Date          : 08-03-2018
    // Last Modified : 08-03-2018, Rinsha
    // Desc          :  
    this.companyService.getLoggedinEntity().subscribe(data => {
      this.entity = data;
      this.loggedin_id = this.entity.id;
      if (data == null || data == '') {
        this.routes.navigate(['/home']);
      }
      if (data.role_id == 2) {
        //super admin
        if (data.delete_status == true || data.block_status == true) {
          this.routes.navigate(['/home']);
        }
      }
      if (data.role_id == 1) {
        //company admin
        if (data.delete_status == true || data.block_status == true || data.cmp_status == "Not Verified") {
          this.routes.navigate(['/company-login']);
        }
        if (data.cmp_status == "Expired") {
          this.routes.navigate(['/expired']);
        }
        if (data.is_profile_completed == false) {
          this.routes.navigate(['/compay-aditninfo', data.cmp_id]);
        }
      }
      if (data.role_id == 3 || data.role_id == 4) {
        //company admin
        if (data.delete_status == true || data.block_status == true) {
          this.routes.navigate(['/company-login']);
        }
      }
    });
    // -----------------------------------End------------------------------------------
    this.getProject();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  getProject() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.date = params['id'];
      this.date = new Date(this.date);
    });
    // console.log(this.selected);
    this.notExist = false;
    // ---------------------------------Start-------------------------------------------
    // Function      : get all projects by status
    // Params        : 
    // Returns       : 
    // Author        : Rinsha
    // Date          : 12-03-2018
    // Last Modified : 12-03-2018, Rinsha
    // Desc          : getAllProjectByStatus 
    this.companyService.isProjectExist(this.date).subscribe(data => {
      console.log(data);
      data = data.data;
      if (data.length == 0) {
        this.notExist = true;
      }
      this.dataSource = new MatTableDataSource(data);
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // ---------------------------------End-------------------------------------------

    // // ---------------------------------Start-------------------------------------------
    // // Function      : get all projects
    // // Params        : 
    // // Returns       : 
    // // Author        : Rinsha
    // // Date          : 07-03-2018
    // // Last Modified : 07-03-2018, Rinsha
    // // Desc          : getAllProjects 
    // this.companyService.getAllProject().subscribe(data => {
    //   // console.log(data);
    //   if (data.length == 0) {
    //     this.notExist = true;
    //   }
    //   this.dataSource = new MatTableDataSource(data);
    //   // console.log(this.dataSource);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
    // // ---------------------------------End-------------------------------------------
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  open() {
    this.routes.navigate(['/add-project']);
  }

  assign(id) {
    this.routes.navigate(['/assign-project', id]);
  }

  edit(id) {
    this.routes.navigate(['/edit-project', id]);
  }

  approve(id) {
    this.routes.navigate(['/approve-estimation', id]);
  }

  approveProject(id) {
    this.routes.navigate(['/approve-project', id]);
  }
  planProject(id) {
    this.routes.navigate(['//project-planning', id]);
  }
  revisedExecution(id) {
    this.routes.navigate(['/revised-execution-planning', id]);
  }

 

  getId(id) {
    this.Pid = id;
  }

  viewProject(id) {
    this.routes.navigate(['/view-project', id]);
  }

}
