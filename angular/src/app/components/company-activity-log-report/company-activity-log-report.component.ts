import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminService } from './../../services/admin.service';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
/* const path = require("path"); */
/* const config = require("./config/config"); */
/* var nodePrd = require('node-prd');
var fs = require('fs') */;
declare let jsPDF;

@Component({
  selector: 'app-company-activity-log-report',
  templateUrl: './company-activity-log-report.component.html',
  styleUrls: ['./company-activity-log-report.component.css']
})
export class CompanyActivityLogReportComponent implements OnInit {

  displayedColumns = ['slno', 'date', 'time', 'user', 'action'];
  dataSource: MatTableDataSource<any>;
  logs = [];
  users = [];
  filters = {
    sDate : new Date,
    eDate :  new Date,
    filterText : '',
    selUsers : 'All',
    filetype :''
  }
  showSpinner :boolean = false;
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
    this.getActivityLog();
    this.companyService.getAllusers().subscribe(data => {
      this.users = data;
      // console.log(data);
    });
   
  }

  getActivityLog() {
    // ---------------------------------Start-------------------------------------------
    // Function      : getEstimatedProject
    // Params        : 
    // Returns       : 
    // Author        : Yasir Poongadan
    // Date          : 07-04-2018
    // Last Modified : 07-04-2018, Yasir Poongadan
    // Desc          : get Estimated Project 
    this.adminService.getActivityLog(this.filters).subscribe(data => {
      // data.project_name = data.tbl_project.project_name;
      // this.projects = data;
      console.log(data);
      this.logs = data;
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
    this.filters.sDate =  value.start;
    this.filters.eDate =  value.end;
    this.getActivityLog();
  }

 PrintDiv() {
  var mywindow = window.open('', 'PRINT', 'height=400,width=600');
  
      mywindow.document.write('<html><head><title>' + document.title  + '</title>');
      mywindow.document.write('</head><body >');
      mywindow.document.write('<h1>' + document.title  + '</h1>');
      mywindow.document.write(document.getElementById('dvContents').innerHTML);
      mywindow.document.write('</body></html>');
  
      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/
  
      // mywindow.print();
      mywindow.close();
  
      return true;
    // var contents = document.getElementById("dvContents").innerHTML;       

    // var printContents = document.getElementById("dvContents").innerHTML;
    // var originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;
}

exportPdf(){
  this.showSpinner = true;
this.filters.filetype = 'pdf'
  this.adminService.logexecuteReportpdf(this.filters).subscribe(res => {
    this.showSpinner = false;
      console.log('start download:',res);
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
  }




    /* var doc = new jsPDF();
    var col = ['Slno', 'Date Time', 'User', 'Action'];
    var rows = [];
    var members = '';
    this.logs.forEach((data, key) => {
      var temp = [
        key+1,
        data.createdAt,
        data.tbl_user_profile.f_name + ' ' + data.tbl_user_profile.l_name,
        data.action
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
  



  tableToExcel(table, name){
    this.showSpinner = true;
    this.filters.filetype = 'excel'
    this.adminService.logexecuteReportexcel(this.filters).subscribe(res => {
      this.showSpinner = false;
      console.log('start download:',res);
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
    
    /* let uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
            window.location.href = uri + base64(format(template, ctx)) */
  }


}
