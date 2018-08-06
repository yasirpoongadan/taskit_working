import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Config } from '../config/config';
import 'rxjs/add/operator/map';
@Injectable()
export class AdminService {

  serviceUrl: string;
  authToken: any;
  admin: any;
  constructor(private http: Http, private config: Config) {
    this.serviceUrl = config.siteUrl + '/admin/';
  }

  setHeader() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return (headers);
  }
  setHeaderWithAuthorization() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return (headers);
  }
  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : all companieslist
  getAllcompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
 // ---------------------------------Start-------------------------------------------
  // Function      : Allactivecompanies
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : Allactivecompanies
  getAllactivecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allactivecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  05-03-2018
  // Last Modified : 
  // Desc          : all blocked companies
  //all blocked companies
  getAllblockedcompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allblockedcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  05-03-2018
  // Last Modified : 
  // Desc          : all deleted companies
  //all deleted companies
  getAlldeletedcompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'alldeletedcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : company id
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : delete company
  //delete company
  deleteCompany(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.put(this.serviceUrl + 'deletecompany/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : company id
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : block company
  //block company
  blockCompany(id) {
    let headers = this.setHeaderWithAuthorization()
    return this.http.put(this.serviceUrl + 'blockcompany/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : company id
  // Returns       : 
  // Author        : sudha
  // Date          : 05-03-2018
  // Last Modified : 
  // Desc          : unblock company
  //unblock company
  unblockCompany(id) {
    let headers = this.setHeaderWithAuthorization()
    return this.http.put(this.serviceUrl + 'unblockcompany/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all subscribedcompanies
  //all subscribedcompanies
  getAllsubcompanies() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.serviceUrl + 'allsubcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all subscribedactivecompanies
  getAllsubactivecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allsubactivecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :06-03-2018
  // Last Modified : 
  // Desc          : all subscribedblockcompanies
  getAllsubblockcompanies() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.serviceUrl + 'allsubblockcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all subscribeddeletecompanies
  getAllsubdeletecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allsubdeletecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all trailcompanies
  getAlltrialcompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'alltrialcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all trialactivecompanies
  getAlltrialactivecompanies() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'alltrialactivecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all trialblockcompanies
  getAlltrialblockcompanies() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.serviceUrl + 'alltrialblockcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all trialdeletecompanies
  getAlltrialdeletecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'alltrialdeletecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
// ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : all notverifiedcompanies
  //all not verified companies
  getAllnotverficompanies() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allnotverficompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : all notverfiactivecompanies
  getAllnotverfiactivecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allnotverfiactivecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 06-03-2018
  // Last Modified : 
  // Desc          : all notverfiblockcompanies
  getAllnotverfiblockcompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allnotverfiblockcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : all notverfideletecompanies
  getAllnotverfideletecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allnotverfideletecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : all expired companies
  //all expired companies
  getAllexpiredcompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allexpiredcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : all expiredactivecompanies
  getAllexpiredactivecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allexpiredactivecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : all expiredblockcompanies
  getAllexpiredblockcompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allexpiredblockcompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin company management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : all expireddeletecompanies
  getAllexpireddeletecompanies() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + 'allexpireddeletecompanies', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
 // ---------------------------------Start-------------------------------------------
  // Function      : Admin notification management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          :  06-03-2018
  // Last Modified : 
  // Desc          : notification
  getAdminnotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'adminnotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : Admin user notification management
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 03-01-2018
  // Last Modified : 
  // Desc          : view status user notifcation
  viewstatusadmin(id) {
   
      let headers = this.setHeaderWithAuthorization();
      return this.http.put(this.serviceUrl + 'viewstatusadmin/' + id, { headers: headers })
        .map(res => res.json());
    
  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : Admin Login
  // Params        : admin, contains username and password
  // Returns       : Token, admin id and role
  // Author        : Rinsha
  // Date          : 01-03-2018
  // Last Modified : 01-03-2018, Rinsha
  // Desc          : Admin login
  adminLogin(admin) {
    let h = this.setHeader();
    return this.http.post(this.serviceUrl + "login", admin, { headers: h })
      .map(res => res.json());
  }
  // -----------------------------------End-----------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : Store User Data
  // Params        : Token, admin id and role
  // Returns       : 
  // Author        : Rinsha
  // Date          : 05-03-2018
  // Last Modified : 05-03-2018, Rinsha
  // Desc          : To locally store admin data

  storeUserData(token, admin) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('admin', JSON.stringify(admin));
    this.authToken = token;
    this.admin = admin;
  }
  // ---------------------------------------End--------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : get all plans
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 05-03-2018
  // Last Modified : 05-03-2018, Rinsha
  // Desc          : getAllplans

  getAllplans() {
    let headers = this.setHeader();
    return this.http.get(this.serviceUrl + 'allplans', { headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : get all plans without default
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, Rinsha
  // Desc          : getAllplans without default

  getPlansWithoutDefault() {
    let headers = this.setHeader();
    return this.http.get(this.serviceUrl + 'allPlansWithoutDefault', { headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : getCountsforAdminDashboard
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 02-03-2018
  // Last Modified : 02-03-2018, Jooshifa 
  // Desc          : for getting count of companies,projects,users

  getCountsforAdminDashboard() {
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "/get_counts_for_dashboard", {}, { headers: h })
      .map(res => res.json());
  }
  //  ---------------------------------End-------------------------------------------

  //  ---------------------------------Start-------------------------------------------
  // Function      : getPieDataforAdminDashboard
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, 
  // Desc          : get piegraph data

  getPieDataforAdminDashboard() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "/super_admin_pie_graph", { headers: h })
      .map(res => res.json());

  }
  //  ---------------------------------End-------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : add plan
  // Params        : data from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : add plan 

  addPlan(plan) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'addPlan', plan, { headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : best plan
  // Params        : id and value
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : to change a plan to best

  bestPlan(id, value) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'bestPlan/' + id, { status: value }, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : delete plan
  // Params        : id 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : to delete a plan which is'nt used by any company

  deletePlan(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'deletePlan/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : get plan by id
  // Params        : id
  // Returns       : plan
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : getplan

  getPlan(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'planById/' + id, { headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : update plan
  // Params        : value from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : update a plan

  updatePlan(plan) {
    // console.log(plan);
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'updatePlan', plan, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : getBarDataforAdminDashboard
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, 
  // Desc          : get piegraph data

  getBarDataforAdminDashboard() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "/super_admin_bar_graph", { headers: h })
      .map(res => res.json());

  }
  //  ---------------------------------End-------------------------------------------
  
  // ---------------------------------Start-------------------------------------------
  // Function      : get all estimated project
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 06-04-2018
  // Last Modified : 06-04-2018, Rinsha
  // Desc          : get all estimated project

  getEstimatedProject(data) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getAllEstimatedProject', data,{ headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : Get logged in entity
  // Params        : 
  // Returns       : Get logged in entity
  // Author        : Rinsha
  // Date          : 20-04-2018
  // Last Modified : 20-04-2018, Rinsha
  // Desc          :  
  getLoggedinEntity() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getLoggedinUser', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
   // ---------------------------------Start-------------------------------------------
  // Function      : get all estimated project
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 06-04-2018
  // Last Modified : 06-04-2018, Rinsha
  // Desc          : get all estimated project

  getProjectReport(data) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getProjectReport', data,{ headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------
   // ---------------------------------Start-------------------------------------------
  // Function      : get all estimated project
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 06-04-2018
  // Last Modified : 06-04-2018, Rinsha
  // Desc          : get all estimated project

  getActivityLog(data) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getActivityLog', data,{ headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------

  
  logexecuteReportpdf(params) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'logexecuteReport', {params},{ headers: headers, responseType: ResponseContentType.Blob })
    .map(res => {
      return {
        filename: 'Activity-log-report.pdf',
        data: res.blob()
      };
    })
      
  } 
    
  logexecuteReportexcel(params) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'logexecuteReport', {params},{ headers: headers, responseType: ResponseContentType.Blob })
    .map(res => {
      return {
        filename: 'Activity-log-report.xlsx',
        data: res.blob()
      };
    })
      
  } 
  estimationReportpdf(params) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'estimationReport', {params},{ headers: headers, responseType: ResponseContentType.Blob })
    .map(res => {
      return {
        filename: 'estimation-report.pdf',
        data: res.blob()
      };
    })
      
  } 
  
  estimationReportexcel(params) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'estimationReport', {params},{ headers: headers, responseType: ResponseContentType.Blob })
    .map(res => {
      return {
        filename: 'estimation-report.xlsx',
        data: res.blob()
      };
    })
      
  } 
  projectReportpdf(params) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'projectReport', {params},{ headers: headers, responseType: ResponseContentType.Blob })
    .map(res => {
      return {
        filename: 'project-report.pdf',
        data: res.blob()
      };
    })
      
  } 
  
  projectReportexcel(params) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'projectReport', {params},{ headers: headers, responseType: ResponseContentType.Blob })
    .map(res => {
      return {
        filename: 'project-report.xlsx',
        data: res.blob()
      };
    })
      
  } 
}

