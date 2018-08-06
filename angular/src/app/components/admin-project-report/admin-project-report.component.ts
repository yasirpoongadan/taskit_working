import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminService } from './../../services/admin.service';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
declare let jsPDF;

@Component({
  selector: 'admin-project-report',
  templateUrl: './admin-project-report.component.html',
  styleUrls: ['./admin-project-report.component.css']
})
export class AdminProjectReportComponent implements OnInit {
  displayedColumns = ['slno', 'project_name', 'project_code', 'sdate', 'edate', 'category', 'status', 'ttl_hr', 'team_head', 'project_cost' ,'action'];
  dataSource: MatTableDataSource<any>;
  projects = [];
  category = [];
  pm = [];
  projectsFlt = [];
  entity: any;
  showPMlist = false;
  showSpinner: Boolean = false;
  filters = {
    sDate: new Date,
    eDate: new Date,
    filterText: '',
    selProj: 'All',
    selCat: 'All',
    pm: 'All',
    status: 'All',
    filetype: ''
  }
  public options: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,

  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selected: any;
  constructor(
    private adminService: AdminService,
    private companyService: CompanyService,
    private routes: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.companyService.getLoggedinEntity().subscribe(data => {
      // console.log(data);
      this.entity = data;
      if (this.entity.role_id != 3) {
        this.showPMlist = true;
      }
    });
    this.companyService.getAllPm().subscribe(res => {
      this.pm = res;
    });

    this.getEstimation();
    this.companyService.getAllprojectcategory().subscribe(data => {
      this.category = data;
      // console.log(data);
    });

    this.companyService.getAllProject().subscribe(data => {
      console.log(data);
      this.projects = data;
    });
  }

  getEstimation() {
    // ---------------------------------Start-------------------------------------------
    // Function      : getEstimatedProject
    // Params        : 
    // Returns       : 
    // Author        : Yasir Poongadan
    // Date          : 07-04-2018
    // Last Modified : 07-04-2018, Yasir Poongadan
    // Desc          : get Estimated Project 
    this.adminService.getProjectReport(this.filters).subscribe(data => {
      // data.project_name = data.tbl_project.project_name;
      // console.log(data);
      this.projectsFlt = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // ---------------------------------End-------------------------------------------
  }



  applyFilter() {
    let filterValue = this.filters.filterText
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public selectedStartDate(value: any, datepicker?: any) {
    this.filters.sDate = value.start;
    this.filters.eDate = value.end;
    this.getEstimation();
  }

  PrintDiv() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(document.getElementById('dvContents').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
    // var contents = document.getElementById("dvContents").innerHTML;       

    // var printContents = document.getElementById("dvContents").innerHTML;
    // var originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;
  }
  viewProject(id) {
    this.routes.navigate(['/view-project', id]);
  }

  exportPdf() {
    this.showSpinner = true;
    this.filters.filetype = 'pdf'
    this.adminService.projectReportpdf(this.filters).subscribe(res => {
      this.showSpinner = false;
      var url = window.URL.createObjectURL(res.data);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
      /* window.open(url) */
    });

    /*  var doc = new jsPDF();
     var col = ["Project Name", "Code",'Planned Start Date','Planned End Date','Total Hours','Category','Status','Team Head','Team Members'];
     var rows = [];
     var members = '';
     this.projectsFlt.forEach((data, key) => {
       members = '';
       data.members.forEach((d,k) => {
         members += d.f_name + ' ' +  d.l_name + ', ';
       })
      let pm = '';
       if(data.prj.Pm_id.role_id=='3' && data.prj.Pm_id.tbl_user_profiles.length > 0){
         pm = data.prj.Pm_id.tbl_user_profiles[0].f_name + ' ' +data.prj.Pm_id.tbl_user_profiles[0].l_name;
       }
       if(data.prj.Pm_id.role_id=='1'){
         pm = data.prj.Pm_id.tbl_companies[0].cmp_name;
       }  
       var temp = [
         // data.prj.project_name,
         // data.prj.project_code,
         // data.prj.createdAt, 
         // data.estimation_hour,
         // data.tbl_project_estimation_team.tbl_user_profile.f_name + ' ' + data.tbl_project_estimation_team.tbl_user_profile.l_name ,
         // members
 
         data.prj.project_name,
         data.prj.project_code,
         data.prj.planned_start_date, 
         data.prj.planned_end_date,
         data.ttlHr,
         data.prj.tbl_project_category.category_name,
         data.prj.status,
         pm,
         members
       ];
       rows.push(temp);
     });
 
     // console.log(rows);
     doc.autoTable(col, rows,
       {
         margin: { horizontal: 7 },
         overflow : 'linebreak',
     });
 
     doc.save('Test.pdf'); */
  }

  tableToExcel(table, name) {
    this.showSpinner = true;
    this.filters.filetype = 'excel'
    this.adminService.projectReportexcel(this.filters).subscribe(res => {
      this.showSpinner = false;
      var url = window.URL.createObjectURL(res.data);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
      /* window.open(url) */
    });

    /*  let uri = 'data:application/vnd.ms-excel;base64,'
         , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
         , base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
         , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
             if (!table.nodeType) table = document.getElementById(table)
             var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
             window.location.href = uri + base64(format(template, ctx)) */
  }

}
