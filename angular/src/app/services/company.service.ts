import { Injectable, Component, OnInit } from '@angular/core';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import { Config } from '../config/config';
import 'rxjs/add/operator/map';
@Injectable()
export class CompanyService {
  serviceUrl: string;
  authToken: any;
  admin: any;
  company: any;
  constructor(private http: Http, private config: Config) {
    this.serviceUrl = config.siteUrl + '/company/';
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
  //  ---------------------------------Start-------------------------------------------
  // Function      : getIndustries
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, 
  // Desc          : get Ind=ustries list from DB
  getIndustries() {
    let h = this.setHeader();
    return this.http.get(this.serviceUrl + "/get_industries", { headers: h })
      .map(res => res.json());
  }
  //  ---------------------------------End-------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : getCompanySize
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, 
  // Desc          : get Company size list from DB
  getCompanySize() {
    let h = this.setHeader();
    return this.http.get(this.serviceUrl + "/get_cmp_size", { headers: h })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get plan by id
  // Params        : id
  // Returns       : plan
  // Author        : Rinsha
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, Rinsha
  // Desc          : getplan
  getPlan(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'planById/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : upgrade
  // Params        : data from form
  // Returns       : message
  // Author        : Rinsha
  // Date          : 06-03-2018
  // Last Modified : 06-03-2018, Rinsha
  // Desc          : upgrade
  upgrade(id, data) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'upgrade/' + id, data, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get all projects
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : getAllProjects 
  getAllProject() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAllProject', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------

    // ---------------------------------Start-------------------------------------------
  // Function      :getProjectsById
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Rinsha
  // Desc          : getAllProjects 
  getProjectsById(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getProjectsById/' +id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------

  
  // ---------------------------------Start-------------------------------------------
  // Function      : Get All pm in a company
  // Params        : 
  // Returns       : All pm in a company
  // Author        : Rinsha
  // Date          : 08-03-2018
  // Last Modified : 08-03-2018, Rinsha
  // Desc          : 
  getAllPm() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAllPm', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Get All project category in a company
  // Params        : 
  // Returns       : All project category in a company
  // Author        : Rinsha
  // Date          : 08-03-2018
  // Last Modified : 08-03-2018, Rinsha
  // Desc          : 
  getAllProjectCategory() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAllProjectCategory', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : add project
  // Params        : data from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 08-03-2018
  // Last Modified : 08-03-2018, Rinsha
  // Desc          :  
  addProject(project) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'addProject', project, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : Login
  // Params        : username and password
  // Returns       : token, company details and company status
  // Author        : Jooshifa
  // Date          : 05-03-2018
  // Last Modified : 05-03-2018, jooshifa
  // Desc          : 
  authenticateCompany(company) {
    let h = this.setHeader();
    return this.http.post(this.serviceUrl + "authenticate", company, { headers: h })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Store User Data
  // Params        : Token, id and role
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 05-03-2018
  // Last Modified : 05-03-2018, jooshifa
  // Desc          : To locally store  data
  storeUserData(token, company) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('company', JSON.stringify(company));
    this.authToken = token;
    this.company = company;
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : Get logged user details
  // Params        : 
  // Returns       : get details of logged in entity
  // Author        : Jooshifa
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Jooshifa
  // Desc          : 
  getLoggedUSerDetails() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getLoggedinCompany', { headers: h })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : Company verification
  // Params        : verification id
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 07-03-2018
  // Last Modified : 07-03-2018, Jooshifa
  // Desc          : 
  verifyCompany(verif_id) {
    let h = this.setHeader();
    return this.http.get(this.serviceUrl + "companyVerification/" + verif_id, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // // ---------------------------------Start-------------------------------------------
  // // Function      : Get logged in entity
  // // Params        : 
  // // Returns       : Get logged in entity
  // // Author        : Rinsha
  // // Date          : 08-03-2018
  // // Last Modified : 08-03-2018, Rinsha
  // // Desc          :  
  // getLoggedinEntity() {
  //   let headers = this.setHeaderWithAuthorization();
  //   return this.http.get(this.serviceUrl + 'getLoggedinCompany', { headers: headers })
  //     .map(res => res.json());
  // }
  // // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get project by id
  // Params        : id
  // Returns       : project
  // Author        : Rinsha
  // Date          : 08-03-2018
  // Last Modified : 08-03-2018, Rinsha
  // Desc          : getProject
  getProject(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getProjectById/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get developer team
  // Params        : 
  // Returns       : users in developer team
  // Author        : Rinsha
  // Date          : 09-03-2018
  // Last Modified : 09-03-2018, Rinsha
  // Desc          : getDeveloperTeam
  getDeveloperTeam() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getDeveloperTeam', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------

    // ---------------------------------Start-------------------------------------------
  // Function      : get developer team
  // Params        : 
  // Returns       : users in developer team
  // Author        : Rinsha
  // Date          : 09-03-2018
  // Last Modified : 09-03-2018, Rinsha
  // Desc          : getallTeamsforassign
  getallTeamsforassign() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getallTeamsforassign', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------


  // ---------------------------------Start-------------------------------------------
  // Function      : get designer team
  // Params        : 
  // Returns       : users in designer team
  // Author        : Rinsha
  // Date          : 09-03-2018
  // Last Modified : 09-03-2018, Rinsha
  // Desc          : getDesignerTeam
  getDesignerTeam() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getDesignerTeam', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get qc team
  // Params        : 
  // Returns       : users in qc team
  // Author        : Rinsha
  // Date          : 09-03-2018
  // Last Modified : 09-03-2018, Rinsha
  // Desc          : getQCTeam
  getQCTeam() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getQCTeam', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : assign project
  // Params        : form data
  // Returns       : 
  // Author        : Rinsha
  // Date          : 09-03-2018
  // Last Modified : 09-03-2018, Rinsha
  // Desc          : AssignTeamHead
  AssignTeamHead(project) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'AssignTeamHead', project, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : edit project
  // Params        : data from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 09-03-2018
  // Last Modified : 09-03-2018, Rinsha
  // Desc          :
  editProject(project) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'editProject', project, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get category by id
  // Params        : id
  // Returns       : category
  // Author        : Rinsha
  // Date          : 08-03-2018
  // Last Modified : 08-03-2018, Rinsha
  // Desc          : getCategoryById
  getCategoryById(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getCategoryById/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : delete project
  // Params        : id 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 12-03-2018
  // Last Modified : 12-03-2018, Rinsha
  // Desc          : to delete a project
  deleteProject(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'deleteProject/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get all projects by status
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 12-03-2018
  // Last Modified : 12-03-2018, Rinsha
  // Desc          : getAllProjectByStatus
  getAllProjectByStatus(status) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAllProjectByStatus/' + status, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get assignHeadNotification
  // Params        : 
  // Returns       : project data
  // Author        : Rinsha
  // Date          : 12-03-2018
  // Last Modified : 12-03-2018, Rinsha
  // Desc          : check whether the loggedin project manager assigned for a project. If yes, then notification to assign team heads
  assignHeadNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'assignHeadNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : close notification
  // Params        : project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 12-03-2018
  // Last Modified : 12-03-2018, Rinsha
  // Desc          : close notification when pm sees the assign team head notification
  closeNotif(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get approveEstimationNotification
  // Params        : 
  // Returns       : notification data
  // Author        : Rinsha
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Rinsha
  // Desc          : check whether the loggedin project manager have pending estimation approval notification
  approveEstimationNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'approveEstimationNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : close notification of estimation approval
  // Params        : notification id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Rinsha
  // Desc          : close notification when pm sees the estimation approval notification
  closeNotif2(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif2/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getProjectstimations
  // Params        : project id
  // Returns       : estimations
  // Author        : Rinsha
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Rinsha
  // Desc          :  
  getProjectstimations(pro_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getProjectstimations/' + pro_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : resubmitEstimation
  // Params        : estimation id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Rinsha
  // Desc          : 
  resubmitEstimation(est_id, resubmitData) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'resubmitEstimation/' + est_id, resubmitData, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : acceptEstimation
  // Params        : estimation id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Rinsha
  // Desc          :  
  acceptEstimation(est_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'acceptEstimation/' + est_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get team heads of the project who does nt involved in estimations
  // Params        : project id
  // Returns       : team head info
  // Author        : Rinsha
  // Date          : 16-03-2018
  // Last Modified : 16-03-2018, Rinsha
  // Desc          : getTeamHeadsToEstimate
  getTeamHeadsToEstimate(p_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getTeamHeadsToEstimate/' + p_id, {},{ headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : forwardEstimationRequest
  // Params        : project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 16-03-2018
  // Last Modified : 16-03-2018, Rinsha
  // Desc          :  
  forwardEstimationRequest(p_id, head_id) {
    let Head_id = { head_id: head_id };
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'forwardEstimationRequest/' + p_id, JSON.stringify(Head_id), { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTotalEstimations
  // Params        : project id
  // Returns       : estimations
  // Author        : Rinsha
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Rinsha
  // Desc          :  
  getTotalEstimations(pro_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getTotalEstimations/' + pro_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : send request to admin for approval
  // Params        : project id, assignee id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Rinsha
  // Desc          : sendForApproval
  sendForApproval(pro_id, pm_id) {
    let PM_id = { pm_id: pm_id }
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'sendForApproval/' + pro_id, PM_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get apprroveProjectNotification
  // Params        : 
  // Returns       : project data
  // Author        : Rinsha
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Rinsha
  // Desc          : check whether the loggedin company admin have any project to approve
  approveProjectNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'approveProjectNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : close notification of project approval
  // Params        : project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Rinsha
  // Desc          : close notification when pm sees the project approval notification
  closeNotif3(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif3/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : accept project
  // Params        : cost, estimated hr, project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, Rinsha
  // Desc          : acceptProject
  acceptProject(project_submit) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'acceptProject', project_submit, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : reject project
  // Params        : cost, estimated hr, project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, Rinsha
  // Desc          : rejectProject
  rejectProject(project_submit) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'rejectProject', project_submit, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : resubmit project
  // Params        : cost, estimated hr, project id, pm id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, Rinsha
  // Desc          : resubmitProject
  resubmitProject(project_submit) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'resubmitProject', project_submit, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get planProjectNotification
  // Params        : 
  // Returns       : project data
  // Author        : Rinsha
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, Rinsha
  // Desc          : check whether the loggedin pm have any project to plan
  planProjectNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'planProjectNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : close notification of project plan
  // Params        : project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, Rinsha
  // Desc          : close notification when pm sees the project plan notification
  closeNotif4(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif4/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get resubmitEstimationNotification
  // Params        : 
  // Returns       : project data
  // Author        : Rinsha
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, Rinsha
  // Desc          : check whether the loggedin pm have any estimation to resubmit
  resubmitEstimationNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'resubmitEstimationNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAcceptedEstimations
  // Params        : project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, Rinsha
  // Desc          : 
  getAcceptedEstimations(pid) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAcceptedEstimations/' + pid, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : forwardStatus
  // Params        : project id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Rinsha
  // Desc          : check whether the estimation request forwarded to any team head is pending
  getforwardStatus(pid) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getforwardStatus/' + pid, { headers: headers })
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
  registerCompany(details) {
    let h = this.setHeader();
    return this.http.post(this.serviceUrl + "/register_company", details, { headers: h })
      .map(res => res.json());
  }
  //  ---------------------------------End-------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : registerCompanyFromadtninfo
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 12-03-2018
  // Last Modified : 12-03-2018, 
  // Desc          : 
  registerCompanyFromadtninfo(details) {
    let h = this.setHeader();
    return this.http.post(this.serviceUrl + "/register_company2", details, { headers: h })
      .map(res => res.json());
  }
  //  ---------------------------------End-------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : forgotPassword
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 12-03-2018
  // Last Modified : 12-03-2018, 
  // Desc          : 
  forgotPassword(newPassword) {
    // console.log("here..."  +  newPassword.email)
    let h = this.setHeader();
    return this.http.post(this.serviceUrl + "/forgotPassword", newPassword, { headers: h })
      .map(res => res.json());
  }
  //  ---------------------------------End-------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : Get company details by id
  // Params        : id
  // Returns       : company details
  // Author        : Jooshifa
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Jooshifa
  // Desc          : 
  getCompanyDetailsById(id) {
    let h = this.setHeader();
    return this.http.get(this.serviceUrl + "getCompanyDetails/" + id, { headers: h })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : Generate token
  // Params        : company id
  // Returns       : jwt token
  // Author        : Jooshifa
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Jooshifa
  // Desc          : 
  generateToken(id) {
    // console.log("id" + id);
    let h = this.setHeader();
    return this.http.get(this.serviceUrl + "generateToken/" + id, { headers: h })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getProjectById 
  // Params        :  id
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Jooshifa
  // Desc :get project details of a purticular id
  getProjectById(id) {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getProjects/" + id, { headers: h })
      .map(res => res.json())
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getDeveloperUsers
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Jooshifa
  // Desc          : to get developer users
  getDeveloperUsers() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-developer-users', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getDesignerrUsers
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Jooshifa
  // Desc          : 
  getDesignerrUsers() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-designer-users', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getQcUsers
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Jooshifa
  // Desc          : 
  getQcUsers() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-qc-users', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTasksModules
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Jooshifa
  // Desc          : 
  getTasksModules(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-modules-tasks/' + id, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAllUsers
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Jooshifa
  // Desc          : 
  getAllUsers() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-all-users', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getComplexity
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 16-03-2018
  // Last Modified : 16-03-2018, Jooshifa
  // Desc          
  getComplexity() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-complexity-percentage', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getDatetime
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 19-03-2018
  // Last Modified : 19-03-2018, Jooshifa
  // Desc          
  getDatetime(newTasks) {
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "/get-date-time", newTasks, { headers: h })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getTeams
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, 
  // Desc          : get team names and strength from db
  getTeams() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getTeams", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
 
  
  // ---------------------------------Start------------------------------------------------
  // Function      : getTeamMembers
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, 
  // Desc          : get team members based on id passed from db
  getTeamMembers(id) {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getMembers/" + id, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : get All Users by project id
  // Params        : project id , '' for all users
  // Returns       : All Users
  // Author        : Yasir Poongadan  
  // Date          : 09-03-2018
  // Last Modified : 09-03-2018, Yasir Poongadan
  // Desc          : 
  getUsers(projId) {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getUsersByProject/" + projId, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // Function      : getTeamMembers
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, 
  // Desc          : get team members based on id passed from db
  assignTeam(members, head, teamId) {
    let h = this.setHeaderWithAuthorization();
    let data = [];
    data.push(members);
    data.push(head);
    data.push(teamId);
    return this.http.post(this.serviceUrl + "assignMemebers/", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getUserGroups
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, 
  // Desc          : get user groups  from db
  getUserGroups() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getUserGroups", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getAccessRights
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, 
  // Desc          : get Access Rights  from db
  getAccessRights(roleId) {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getAccessRights/" + roleId, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------------End--------------------------------------------
  // Function      : assignRights
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 16-03-2018
  // Last Modified : 16-03-2018, 
  // Desc          : assign tights to usergroup
  assignRights(rights, id) {
    let h = this.setHeaderWithAuthorization();;
    return this.http.post(this.serviceUrl + "assignRights/"+id,rights, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
    // Function      : assignRights
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 16-03-2018
  // Last Modified : 16-03-2018, 
  // Desc          : assign tights to usergroup
  getWorkTimes(){
    let h = this.setHeaderWithAuthorization();;
    return this.http.get(this.serviceUrl + "getWorkingTimes", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
      // Function      : assignRights
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 16-03-2018
  // Last Modified : 16-03-2018, 
  // Desc          : assign tights to usergroup
  getWeekTimes(){
    let h = this.setHeaderWithAuthorization();;
    return this.http.get(this.serviceUrl + "getWeekHours", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------------End--------------------------------------------
    // Function      : saveWorkTimes
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, 
  // Desc          : save company work time to DB
  saveWorkTimes(id, start, end){
    let data = {
      id:id,
      start:start,
      end:end
    }
    let h = this.setHeaderWithAuthorization();;
    return this.http.post(this.serviceUrl + "saveWorkingTimes",data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
   // ---------------------------------------End--------------------------------------------
    // Function      : saveWorkTimes
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, 
  // Desc          : save company work time to DB
  deleteBreak(id){
    let data = {
      id:id
    }
    let h = this.setHeaderWithAuthorization();;
    return this.http.post(this.serviceUrl + "deleteBreak",data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
   // ---------------------------------------End--------------------------------------------
    // Function      : saveWorkTimes
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 20-03-2018
  // Last Modified : 20-03-2018, 
  // Desc          : save company work time to DB
  saveBreak(time){
    let h = this.setHeaderWithAuthorization();;
    return this.http.post(this.serviceUrl + "saveBreak",time, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
       // Function      : getHoliday
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 22-03-2018
  // Last Modified : 22-03-2018, 
  // Desc          : get Holidays from DB
  getHoliday(value){
    let data = {
      year:value
    }
    let h = this.setHeaderWithAuthorization();;
    return this.http.post(this.serviceUrl + "getHoliday",data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
       // Function      : getHoliday
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 22-03-2018
  // Last Modified : 22-03-2018, 
  // Desc          : get Holidays from DB
  getYears(){
    let h = this.setHeaderWithAuthorization();;
    return this.http.get(this.serviceUrl + "getYears", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
// Function      : updateHoliday
// Params        : 
// Returns       : 
// Author        : MANU PRASAD
// Date          : 22-03-2018
// Last Modified : 22-03-2018, 
// Desc          : update holiday in DB
updateHoliday(data){
  
  let h = this.setHeaderWithAuthorization();;
  return this.http.post(this.serviceUrl + "updateHoliday",data, { headers: h })
    .map((response: Response) => response.json());
}
// ---------------------------------------End--------------------------------------------
// Function      : updateHoliday
// Params        : 
// Returns       : 
// Author        : MANU PRASAD
// Date          : 22-03-2018
// Last Modified : 22-03-2018, 
// Desc          : update holiday in DB
deleteHoliday(data){
  let d = {
    id:data
  }
  let h = this.setHeaderWithAuthorization();;
  return this.http.post(this.serviceUrl + "deleteHoliday",d, { headers: h })
    .map((response: Response) => response.json());
}
// ---------------------------------------End--------------------------------------------
 // ---------------------------------Start------------------------------------------------
  // Function      : getAccessRights
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, 
  // Desc          : get Access Rights  from db
  saveHoliday(date,title){
    let data = {
      date: date,
      title: title
    }
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "saveHoliday", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : Get logged in entity
  // Params        : 
  // Returns       : Get logged in entity
  // Author        : Rinsha
  // Date          : 08-03-2018
  // Last Modified : 08-03-2018, Rinsha
  // Desc          :  
  getLoggedinEntity() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getLoggedinCompany', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  
  // ---------------------------------Start-------------------------------------------
  // Function      : getAvailablity
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Jooshifa
  // Desc          : 
  getAvailablity(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-availablity/' + id, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getPublicHolidays
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Jooshifa
  // Desc          : 
  getPublicHolidays() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "/get-public-holidays", { headers: h })
      .map(res => res.json());
  }
  // ----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getWorkingTime
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Jooshifa
  // Desc          : 
  getWorkingTime() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "/get-working-time", { headers: h })
      .map(res => res.json());
  }
  // ----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getOffDays
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Jooshifa
  // Desc          : 
  getOffDays() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "/get-off-days-assoc", { headers: h })
      .map(res => res.json());
  }
  // ----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : breakTime
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Jooshifa
  // Desc          : 
  getbreakTime() {
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "/get-break-time", { headers: h })
      .map(res => res.json());
  }
   // ----------------------------------End------------------------------------------
     // ---------------------------------Start------------------------------------------------
  // Function      : Logout
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 28-03-2018
  // Last Modified : 28-03-2018, Jooshifa
  // Desc          : 
  logout() {
    this.authToken = null;
    this.company = null;
    localStorage.clear();
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getUserProjectsOnStatus
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : get details of project involved by user based on status from db
  getNotifications(){
   
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getNotifications2",  { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifnewTaskReq
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new request
  closeNotifnewTaskReq(id){
   
    let h = this.setHeaderWithAuthorization();
    let data = {
       id: id
    }
    return this.http.post(this.serviceUrl + "closeNotifnewTaskReq", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 
  closeNotifAproval(id){
   
    let h = this.setHeaderWithAuthorization();
    let data = {
       id: id
    }
    return this.http.post(this.serviceUrl + "closeNotifAproval", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 
  getNewTaskRequests(){
   
    let h = this.setHeaderWithAuthorization();
    
    return this.http.get(this.serviceUrl + "getNewTaskRequests", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
    // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 
  getNewTaskRequest(id){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    
    return this.http.get(this.serviceUrl + "getNewTaskRequest/"+id, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 
  getProjectDetails(id){

    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getProjectsDetails/"+id, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------

  // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 

  editTask(task){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "edit-task-in-manage-new-task" ,task, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------

  // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 
  checkRole(){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    
    return this.http.get(this.serviceUrl + "checkRole/", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 
  approveTask(data){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    
    return this.http.post(this.serviceUrl + "approveTask/",data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
   // ---------------------------------Start------------------------------------------------
  // Function      : closeNotifAproval
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : close the notification of new  Aproval 
  rejectTask(taskReqId){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "rejectTaskRequest/"+taskReqId,{}, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
   // ---------------------------------Start------------------------------------------------
  // Function      : rejectTask
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 07-04-2018
  // Last Modified : 07-04-2018, 
  // Desc          : Reject new Task request
  sendApproval(taskReqId){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    
    return this.http.post(this.serviceUrl + "sendApproval/"+taskReqId, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
    // ---------------------------------Start------------------------------------------------
  // Function      : getDayBreaks
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 07-04-2018
  // Last Modified : 07-04-2018, 
  // Desc          : Get breaks in the day
  getDayBreaks(day,week){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    let data = {
      day: day,
      week: week
    }
    return this.http.post(this.serviceUrl + "getDayBreaks/", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
    // ---------------------------------Start------------------------------------------------
  // Function      : getDayBreaks
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 07-04-2018
  // Last Modified : 07-04-2018, 
  // Desc          : Get breaks in the day
  getDayDetails(day,week){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    let data = {
      day: day,
      week: week
    }
    return this.http.post(this.serviceUrl + "getDayDetails/", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
     // ---------------------------------Start------------------------------------------------
  // Function      : saveDayBreak
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 12-04-2018
  // Last Modified : 12-04-2018, 
  // Desc          : Get breaks in the day
  saveDayBreak(day,week,xtime,ytime,title){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    let data = {
      day: day,
      week: week,
      startTime: xtime,
      endTime: ytime,
      title: title
    }
    return this.http.post(this.serviceUrl + "saveDayBreak/", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
     // ---------------------------------Start------------------------------------------------
  // Function      : deleteExtraBreak
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 12-04-2018
  // Last Modified : 12-04-2018, 
  // Desc          : Delete breaks of days
  deleteExtraBreak(breakId){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    
    return this.http.post(this.serviceUrl + "deleteExtraBreak/"+breakId,  { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : saveDayWorkTime
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 12-04-2018
  // Last Modified : 12-04-2018, 
  // Desc          : save working time of a day
  saveDayWorkTime(holiday, startTime, endTime, day,week){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    let data = {
      holiday: holiday,
      startTime: startTime,
      endTime: endTime,
      day: day,
      week: week
    }
    return this.http.post(this.serviceUrl + "saveDayWorkTime", data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : geTAllEstimatedProject
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 09-04-2018
  // Last Modified : 09-04-2018, 
  // Desc          : to get All Estimated Project
  getAllEstimatedProject(){
    // console.log("h")
    let h = this.setHeaderWithAuthorization();
    
    return this.http.get(this.serviceUrl + "getAllEstimatedProject", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  
  
  // ---------------------------------Start-------------------------------------------
  // Function      : getAllusers
  // Params        : 
  // Returns       : list of users
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : all users 
  getAllusers() {
    let headers = this.setHeaderWithAuthorization();
    // console.log(headers);
    return this.http.get(this.serviceUrl + 'allusers', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      :  company User management
  // Params        : User id
  // Returns       : 
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : delete User
  //delete User
  deleteUser(id) {
    let header = this.setHeaderWithAuthorization();
    // console.log(header);
    return this.http.post(this.serviceUrl + 'deleteuser/' + id,{}, { headers: header })
      .map((response: Response) => response.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      :  company User management
  // Params        : User id
  // Returns       : 
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : block User
  //block User
  blockUser(id) {
    let header = this.setHeaderWithAuthorization();
    return this.http.put(this.serviceUrl + 'blockuser/' + id, { headers: header })
    .map((response: Response) => response.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : Admin User management
  // Params        : User id
  // Returns       : 
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : unblock User
  //unblock User
  unblockUser(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.put(this.serviceUrl + 'unblockuser/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAllactiveusers
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : list of active users
  getAllactiveusers() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allactiveusers', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : getAllblockedusers
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : list of block users
  getAllblockedusers() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allblockedusers', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
      // ---------------------------------Start-------------------------------------------
  // Function      : getAlldeleteusers
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : list of all delete users
  getAlldeleteusers() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'alldeleteusers', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
     //  ---------------------------------Start-------------------------------------------
  // Function      : adduser
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          :08-03-2018
  // Last Modified : 
  // Desc          : adduser
  addUser(data: any) {
    // console.log(data);
    // console.log("dgdh");
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'adduser', data, { headers: headers })
      .map(res => res.json());
  }
  // < ----------------------------------End-------------------------------------------
      // ---------------------------------Start-------------------------------------------
  // Function      : getAllusergroup
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 08-03-2018
  // Last Modified : 
  // Desc          : list of usergroup
  getAllusergroup() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allusergroup', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
        // ---------------------------------Start-------------------------------------------
  // Function      : getAllPrevexp
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 08-03-2018
  // Last Modified : 
  // Desc          : list of Prevexp
  getAllPrevexp() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allprevexp', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
          // ---------------------------------Start-------------------------------------------
  // Function      : getAllTeam
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 08-03-2018
  // Last Modified : 
  // Desc          : list of Team
  getAllTeam() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allteam', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
            // ---------------------------------Start-------------------------------------------
  // Function      : getAllDesignation
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 08-03-2018
  // Last Modified : 
  // Desc          : list of Designation
  getAllDesignation() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'alldesignation', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getSingleuser
  // Params        : User id
  // Returns       : 
  // Author        : sudha
  // Date          : 07-03-2018
  // Last Modified : 
  // Desc          : Singleuser
  //unblock User
  getSingleuser(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'singleuser',{id:id}, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
        //  ---------------------------------Start-------------------------------------------
  // Function      : updateuser
  // Params        : user
  // Returns       : 
  // Author        : sudha
  // Date          : 29-01-2018
  // Last Modified :
  // Desc          : to updateuser 
  updateUser(user: any) {
    // console.log(plan);
    let headers = this.setHeaderWithAuthorization();
     
       return this.http.post(this.serviceUrl + 'updateuser', user, { headers: headers})
         .map(res => res.json())
     }
   
     // < ----------------------------------End------------------------------------------- 
      // ---------------------------------Start-------------------------------------------
  // Function      : allprojectcategory
  // Params        : 
  // Returns       : allprojectcategory
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : allprojectcategory
  getAllprojectcategory() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allprojectcategory', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : deleteCategory
  // Params        : Category id
  // Returns       : 
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : deleteCategory
  //deleteCategory
  deleteCategory(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.put(this.serviceUrl + 'deletecategory/' + id, {},{ headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  
  // ---------------------------------Start-------------------------------------------
  // Function      : addCategory
  // Params        : Category name
  // Returns       : 
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : addCategory
  //addCategory
  addCategory(name) {
   // console.log("er"+name);
  let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'addcategory/' ,{name:name}, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
          // ---------------------------------Start-------------------------------------------
  // Function      : updateCategory
  // Params        : Category name
  // Returns       : 
  // Author        : sudha
  // Date          : 13-03-2018
  // Last Modified : 
  // Desc          : updateCategory
  //updateCategory
  updateCategory(category:any) {
    let headers = this.setHeaderWithAuthorization();
     return this.http.post(this.serviceUrl + 'updatecategory/',(category),{ headers: headers })
       .map(res => res.json());
   }
   // -----------------------------------End-----------------------------------------
     // ---------------------------------Start-------------------------------------------
  // Function      : singlecategory
  // Params        : category id
  // Returns       : 
  // Author        : sudha
  // Date          : 13-03-2018
  // Last Modified : 
  // Desc          : singlecategory
  //unblock User
  getSinglecategory(project_id: any) {
    
    let headers = this.setHeaderWithAuthorization();
     return this.http.get(this.serviceUrl + "singlecategory/" + project_id, { headers: headers})
       .map(res => res.json())
   }
 
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAllemployeeleaves
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 14-03-2018
  // Last Modified : 
  // Desc          : list of Allemployeeleaves
  getAllemployeeleaves() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allempleaves', { headers: headers }) 
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
   // ---------------------------------Start-------------------------------------------
  // Function      : getAllcompanyemployee
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 14-03-2018
  // Last Modified : 
  // Desc          : list of Allcompanyemployee
  getAllcompanyemployee() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allcompanyemployee', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------\
  
    // ---------------------------------Start-------------------------------------------
  // Function      : getAllcompanyemployee
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 14-03-2018
  // Last Modified : 
  // Desc          : list of Allcompanyemployee
  getAllcompanyemployeeWithTeam() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAllcompanyemployeeWithTeam', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
   // ---------------------------------Start-------------------------------------------
  // Function      : getAllcompanyemployee
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 14-03-2018
  // Last Modified : 
  // Desc          : list of Allcompanyemployee

  getoldPlanningData(projectid) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getoldPlanningData/' + projectid,{ headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------

    // ---------------------------------Start-------------------------------------------
  // Function      : getAllcompanyemployee
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 14-03-2018
  // Last Modified : 
  // Desc          : list of Allcompanyemployee

  isProjectExist(holiday) {
    console.log(holiday);
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'isProjectExist/' + holiday ,{ headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : deleteEmpleave
  // Params        : Empleave id
  // Returns       : 
  // Author        : sudha
  // Date          : 14-03-2018
  // Last Modified : 
  // Desc          : deleteEmpleaveeCategory
  //deleteEmpleave
  deleteEmpleave(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.put(this.serviceUrl + 'deleteempleave/' + id,{}, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
       // ---------------------------------Start-------------------------------------------
  // Function      : singleempleave
  // Params        : empleave id
  // Returns       : 
  // Author        : sudha
  // Date          : 15-03-2018
  // Last Modified : 
  // Desc          : singleempleave
  //unblock User
  getSingleempleave(id: any) {
    
    let headers = this.setHeaderWithAuthorization();
     return this.http.get(this.serviceUrl + "singleempleave/" + id, { headers: headers})
       .map(res => res.json())
   }
 
  // -----------------------------------End------------------------------------------
       //  ---------------------------------Start-------------------------------------------
  // Function      : addEmpleave
  // Params        : data
  // Returns       : 
  // Author        : sudha
  // Date          : 15-03-2018
  // Last Modified : 
  // Desc          : addEmpleave
  addnewEmpleave(data: any) {
    // console.log(data)
    let headers = this.setHeaderWithAuthorization();
   
    return this.http.post(this.serviceUrl + 'addEmpleave', data, { headers: headers })
      .map(res => res.json());
  }
  // < ----------------------------------End-------------------------------------------
          //  ---------------------------------Start-------------------------------------------
  // Function      : updateEmpleave
  // Params        : Empleaveid
  // Returns       : 
  // Author        : sudha
  // Date          : 15-01-2018
  // Last Modified :
  // Desc          : to updateEmpleave 
  updateEmpleave(Empleave: any) {
    // console.log(Empleave);
    let headers = this.setHeaderWithAuthorization();
     
       return this.http.post(this.serviceUrl + 'updateempleave', Empleave, { headers: headers})
         .map(res => res.json())
     }
   
     // < ----------------------------------End------------------------------------------- 
       //  ---------------------------------Start-------------------------------------------
  // Function      : getDatefilterforlog
  // Params        : data
  // Returns       : 
  // Author        : sudha
  // Date          :16-03-2018
  // Last Modified : 
  // Desc          : datefilterforlog
 
  getDatefilterforlog(data: any) {
    // console.log(data)
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'datefilterforlog', data, { headers: headers })
      .map(res => res.json());
  }
  // < ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAllemppendingleaves
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 28-03-2018
  // Last Modified : 
  // Desc          : list of getAllemppendingleaves
  getAllemppendingleaves() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allemppendingleaves', { headers: headers }) 
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
// ---------------------------------Start-------------------------------------------
  // Function      : userleave
  // Params        : userleave id
  // Returns       : 
  // Author        : sudha
  // Date          : 28-03-2018
  // Last Modified : 
  // Desc          : userleave
  //userleave
  getuserleave(id: any) {
    
    let headers = this.setHeaderWithAuthorization();
     return this.http.get(this.serviceUrl + "userleave/" + id, { headers: headers})
       .map(res => res.json())
   }
 
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : addReason
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 29-03-2018
  // Last Modified : 
  // Desc          : add reject reason
  //updateCategory
  addReason(reason:any) {
    let headers = this.setHeaderWithAuthorization();
      return this.http.post(this.serviceUrl + 'addrejectleave/' ,reason, { headers: headers })
        .map(res => res.json());
    }
    // -----------------------------------End------------------------------------------
     // ---------------------------------Start-------------------------------------------
  // Function      : addaccept
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 29-03-2018
  // Last Modified : 
  // Desc          : add accept reason
  //addaccept
  addaccept(accept:any) {
    let headers = this.setHeaderWithAuthorization();
      return this.http.post(this.serviceUrl + 'addacceptleave/' ,accept, { headers: headers })
        .map(res => res.json());
    }
    // -----------------------------------End------------------------------------------
      // ---------------------------------Start-------------------------------------------
  // Function      : allemppendingleavesnotifi
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 29-03-2018
  // Last Modified : 
  // Desc          : list of get All emp pending leaves notification
  getAllemppendingleavesnotifi() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allemppendingleavesnotifi', { headers: headers }) 
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : closeNotif5
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 29-03-2018
  // Last Modified : 
  // Desc          : close Notif for leave request
  //closeNotif5
  closeNotif5(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'leavenotifclose/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAlltimeextensionrequest
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 04-04-2018
  // Last Modified : 
  // Desc          : list of Altime extension request
  getAlltimeextensionrequest() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'alltimeextension', { headers: headers }) 
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : gettimerequest
  // Params        : gettimerequest id
  // Returns       : 
  // Author        : sudha
  // Date          : 04-04-2018
  // Last Modified : 
  // Desc          : get time request details
  //userleave
  gettimerequest(reqid,projid) {
    var data = { reqid: reqid, projid: projid }
    let headers = this.setHeaderWithAuthorization();
    // console.log("a"+data)
     return this.http.post(this.serviceUrl + "timerequest" ,data,  { headers: headers})
       .map(res => res.json())
   }
 
  // -----------------------------------End------------------------------------------
     // ---------------------------------Start-------------------------------------------
  // Function      : Rejecttimeextreq
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 05-04-2018
  // Last Modified : 
  // Desc          : Reject time ext req to pm
  //Rejecttimeextreq
  Rejecttimeextreq(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'rejecttimeextreq/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
       // ---------------------------------Start-------------------------------------------
  // Function      : getUserleavedata
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 07-04-2018
  // Last Modified : 
  // Desc          : get User leave data(time extension request)
  //unblock User
  getUserleavedata(id) {
    
    let headers = this.setHeaderWithAuthorization();
     return this.http.get(this.serviceUrl + "userleavedata/" + id, { headers: headers})
       .map(res => res.json())
   }
 
  // -----------------------------------End------------------------------------------
     // ---------------------------------Start-------------------------------------------
  // Function      : Sendtoadmin
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 05-04-2018
  // Last Modified : 
  // Desc          : Send to admin (time ext req )
  //Sendtoadmin
  Sendtoadmin(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.put(this.serviceUrl + 'sendtoadmin/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : getAllSendtoadminnotif
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 05-04-2018
  // Last Modified : 
  // Desc          : send to admin notif(time extension approval)
  getAllSendtoadminnotif() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'sendtoadminnotif', { headers: headers }) 
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  
  // ---------------------------------Start-------------------------------------------
  // Function      : closeNotif6
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          :  06-04-2018
  // Last Modified : 
  // Desc          : close Notif for time extension approval
  //closeNotif6
  closeNotif6(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'admintimeextnotifclose/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getAccessRightsforRole
  // Params        : 
  // Returns       : 
  // Author        : Manu Prasad
  // Date          : 19-04-2018
  // Last Modified : 
  // Desc          : getAccessRightsforRole
  //closeNotif6
  getAccessRightsforRole() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAccessRightsforRole', { headers: headers })
    .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTasksByUser
  // Params        : pro_id, user_id
  // Returns       : 
  // Author        : Rinsha
  // Date          :  17-04-2018
  // Last Modified : 
  // Desc          : 
  
  getTasksByUser(pro_id, user_id) {
    let userid = {user_id : user_id};
    let headers = this.setHeader();
    return this.http.post(this.serviceUrl + 'getTasksByUser/' + pro_id, userid, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTasksByProject
  // Params        : pro_id
  // Returns       : 
  // Author        : Rinsha
  // Date          :  17-04-2018
  // Last Modified : 
  // Desc          : 
  
  getTasksByProject(pro_id) {
    let headers = this.setHeader();
    return this.http.get(this.serviceUrl + 'getTasksByProject/' + pro_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTasksforResourceGraph
  // Params        : pro_id, users
  // Returns       : 
  // Author        : Rinsha
  // Date          :  18-04-2018
  // Last Modified : 
  // Desc          : 
  
  getTasksforResourceGraph(pro_id, users) {
    let user = {user : users};
    let headers = this.setHeader();
    return this.http.post(this.serviceUrl + 'getTasksforResourceGraph/' + pro_id, user, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
    // Function      : getHoursforResourceGraph
    // Params        : projects
    // Returns       : 
    // Author        : Rinsha
    // Date          :  18-04-2018
    // Last Modified : 
    // Desc          : 
  
    getHoursforResourceGraph(projects) {
      let project = {project : projects};
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getHoursforResourceGraph', project, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
    // Function      : getdataforProjectVsStatusGraph
    // Params        : projects
    // Returns       : 
    // Author        : Rinsha
    // Date          :  19-04-2018
    // Last Modified : 
    // Desc          : 
  
    getdataforProjectVsStatusGraph(projects) {
      let project = {project : projects};
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getdataforProjectVsStatusGraph', project, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  
  // ---------------------------------Start-------------------------------------------
    // Function      : getLastTaskDetails
    // Params        : projects
    // Returns       : 
    // Author        : Rinsha
    // Date          :  19-04-2018
    // Last Modified : 
    // Desc          : 
  
    getLastTaskDetails(projectId,assignedId) {
      // let project = {project : projects};
      let headers = this.setHeader();
    return this.http.post(this.serviceUrl + 'getLastTaskDetails/'+projectId, {assignedId:assignedId}, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getUserleavedataplanning
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          :  06-04-2018
  // Last Modified : 
  // Desc          : getUserleavedataplanning
  //closeNotif6
  getUserleavedataplanning(data) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'company-planning-enddate/', data, { headers: headers })
    .map(res => res.json());
 
   }
    // -----------------------------------End------------------------------------------
         // ---------------------------------Start-------------------------------------------
  // Function      : ApprovedTimeextension
  // Params        : id
  // Returns       : 
  // Author        : sudha
  // Date          : 21-04-2018
  // Last Modified : 
  // Desc          : ApprovedTimeextension
  //Sendtoadmin


    ApprovedTimeextension(aditionalrequestdata) {
      // console.log(id)
        let headers = this.setHeader();
        return this.http.post(this.serviceUrl + 'ApprovedTimeextension', aditionalrequestdata, { headers: headers })
        .map(res => res.json());
     
       }
  // -----------------------------------End------------------------------------------
  getProjectReport(data){
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getProjectReport', data, { headers: headers })
    .map(res => res.json());
 
   }
  
  // -----------------------------------End------------------------------------------
      // ---------------------------------Start-------------------------------------------
  // Function      : savecompanyPlanning
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Jooshifa
  // Desc          : 
  savecompanyPlanning(data,teamhead) {
    // let x= data
    // console.log(data)
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'save-company-planning-datas', {info:data,projectEndDate: data.projectEndDate,projectStartDate:data.projectStartDate,project_id:data.project_id,teamhead : teamhead}, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End------------------------------------------

  savecompanyRevisePlanning(changedData,oldData, teamhead ,projectOldEndDate){
      // console.log(data)
      let headers = this.setHeaderWithAuthorization();
      return this.http.post(this.serviceUrl + 'save-company-revise-planning-datas', {info:changedData, oldData : oldData, projectOldEndDate : projectOldEndDate,projectEndDate: changedData.projectEndDate,projectStartDate:changedData.projectStartDate,project_id:changedData.project_id,teamhead : teamhead}, { headers: headers })
        .map(res => res.json());
    }
    // ---------------------------------Start-------------------------------------------

    

    
  // Function      : close notification
  // Params        : project id
  // Returns       : 
  // Author        : manu
  // Date          : 12-03-2018
  // Last Modified : 12-03-2018, Rinsha
  // Desc          : close notification timeextension
  closeNotif9(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif9/' + id, { headers: headers })
      .map(res => res.json());

  }
  // -----------------------------------End------------------------------------------

 // ---------------------------------Start------------------------------------------------
  // Function      : getUserProjectsOnStatus
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : get details of time extension pending
  gettimeextentionNotifications(){
     let h = this.setHeaderWithAuthorization();
     return this.http.get(this.serviceUrl + "getNotifications",  { headers: h })
       .map((response: Response) => response.json());
   }
   // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : editTaskValidation
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, 
  // Desc          : 
  editTaskValidation(data) {
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'edit-task-validation', data, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
      // ---------------------------------Start-------------------------------------------
  // Function      : getAlldesignations
  // Params        : 
  // Returns       : getAlldesignations
  // Author        : Jooshifa
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : getAlldesignations
  getAlldesignations() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getAlldesignations', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
          // ---------------------------------Start-------------------------------------------
  // Function      : addDesignation
  // Params        :  name
  // Returns       : 
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          :addDesignation
  //addCategory
  addDesignation(name) {
    // console.log("er"+name);
   let headers = this.setHeaderWithAuthorization();
     return this.http.post(this.serviceUrl + 'addDesignation/' ,{name:name}, { headers: headers })
       .map(res => res.json());
   }
   // -----------------------------------End------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : deleteDesignation
  // Params        : Category id
  // Returns       : 
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : deleteCategory
  //deleteCategory
  deleteDesignation(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.put(this.serviceUrl + 'deleteDesignation/' + id, {},{ headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
      // ---------------------------------Start-------------------------------------------
  // Function      : deleteDesignation
  // Params        : Category id
  // Returns       : 
  // Author        : sudha
  // Date          : 12-03-2018
  // Last Modified : 
  // Desc          : deleteCategory
  //deleteCategory
  getSingledesignation(id) {
    console.log("hereeee");
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getSingledesignation/' + id ,{ headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
            // ---------------------------------Start-------------------------------------------
  // Function      : updateDesignation
  // Params        :  name
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 13-03-2018
  // Last Modified : 
  // Desc          : updateCategory
  //updateCategory
  updateDesignation(designation:any) {
    let headers = this.setHeaderWithAuthorization();
     return this.http.post(this.serviceUrl + 'updateDesignation/',(designation),{ headers: headers })
       .map(res => res.json());
   }
   // -----------------------------------End------------------------------------------
   // ---------------------------------Start-------------------------------------------
  // Function      : checkEmailExist
  // Params        :  name
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 13-03-2018
  // Last Modified : 
  // Desc          : checkEmailExist

  //updateCategory

  checkEmailExist(email) {
    console.log(email);
    let headers = this.setHeader();
     return this.http.post(this.serviceUrl + 'checkemailexist/',{email : email},{ headers: headers })
       .map(res => res.json());

    
   }
   // -----------------------------------End------------------------------------------
     // ---------------------------------Start-------------------------------------------
  // Function      : getProfile
  // Params        : 
  // Returns       : logged in user details
  // Author        : Rinsha
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Rinsha
  // Desc          : 
  getProfile() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getProfile', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
     // ---------------------------------Start-------------------------------------------
  // Function      : saveActivityLog
  // Params        : msg,ref_id
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 27-07-2018
  // Last Modified : 27-07-2018, Yasir Poongadan
  // Desc          : 
  saveActivityLog(data) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'saveActivityLog/',data,{ headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getProjectApproveNotifications
  // Params        : msg,ref_id
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 27-07-2018
  // Last Modified : 27-07-2018, Yasir Poongadan
  // Desc          : 
  getProjectApproveNotifications() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getProjectApproveNotifications/',{ headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : projectApprove
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan 
  // Date          : 03-08-2018
  // Last Modified : 03-08-2018, Yasir Poongadan
  // Desc          :  
  projectApprove(projId) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'projectApprove/' + projId, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  

  
   
}
