
import { Injectable, Component, OnInit } from '@angular/core';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { Config } from './../config/config';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {
  serviceUrl: string;
  authToken: any;
  company: any;
  admin: any;
  user: any;
  constructor(private http: Http, private config: Config) {
    this.serviceUrl = config.siteUrl + '/user/';
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
  // Function      : getTasksModules
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  getMyTasks() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-my-tasks', { headers: headers })
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
  getPercentage() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-progress-percentage', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyTasksPaused
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  getAllTasksInModule() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-all-task-in-module', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyTasksPaused
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  getTaskTime() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-task-time', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyTasksPaused
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  doneAtask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'done-a-task/' + task, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyTasksPaused
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  pauseTask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'pause-a-task', task, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : completeATask
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  completeATask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'complete-a-task', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : completeATask
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  holdATask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'hold-a-task', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyTasksPaused
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  startAtask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'start-a-task/', task, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
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
  // ---------------------------------Start-------------------------------------------
  // Function      : getUserProfile
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  getUserProfile() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'get-user-Profile', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : newTaskRequest
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  newTaskRequest(task) {
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "new-task-request", task, { headers: h })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : newTaskRequest
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  newTimeExtention(task) {
    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "time-extention-request", task, { headers: h })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getUserProjects
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : get details of project involved by user from db
  getUserProjects() {
   
    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getUserProjects", { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getUserProjects
  // Params        : 
  // Returns       : 
  // Author        : MANU PRASAD
  // Date          : 26-03-2018
  // Last Modified : 26-03-2018, 
  // Desc          : get details of project involved by user from db
  getProjectDetails(id) {

    let h = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "getUserProjectsDetails/" + id, { headers: h })
      .map((response: Response) => response.json());
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
  getUserProjectsOnStatus(status) {

    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "getUserProjectsOnStatus", { status: status }, { headers: h })
      .map((response: Response) => response.json());
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
  getUserProjectSelected(id) {

    let h = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + "getSelectedProjects", { id: id }, { headers: h })
      .map((response: Response) => response.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get pm by id
  // Params        : login id
  // Returns       : user info
  // Author        : Rinsha
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Rinsha
  // Desc          : getPmByLoginid
  getPmByLoginid(login_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getPmByLoginid/' + login_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTeamMembers
  // Params        : login id, project id
  // Returns       : team members
  // Author        : Rinsha
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Rinsha
  // Desc          :  Find user profile id of head from tbl_user_profie using login id. Then find the team id from tbl_estimation_teams using head id. Then team members from tbl_team_assocs. 
  getTeamMembers(project_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getTeamMembers/' + project_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : add estimation
  // Params        : data from form
  // Returns       : 
  // Author        : Rinsha
  // Date          : 13-03-2018
  // Last Modified : 13-03-2018, Rinsha
  // Desc          :  
  addEstimation(datafromForm) {
    console.log("service");
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'addEstimation', datafromForm, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get TeamHeadNotification
  // Params        : 
  // Returns       : notification data
  // Author        : Rinsha
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Rinsha
  // Desc          : check whether the loggedin user assigned for a project estimation(ie .as team head).
  TeamHeadNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getTeamHeadNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : get notif by id
  // Params        : id
  // Returns       : notification
  // Author        : Rinsha
  // Date          : 14-03-2018
  // Last Modified : 14-03-2018, Rinsha
  // Desc          : check whether the logged in member is the suitable person to estimate
  getNotif(notif_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getNotif/' + notif_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getCurrentEstimation
  // Params        : notification id
  // Returns       : estimation
  // Author        : Rinsha
  // Date          : 15-03-2018
  // Last Modified : 15-03-2018, Rinsha
  // Desc          : get Current Estimation from notification id
  getCurrentEstimation(notif_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getCurrentEstimation/' + notif_id, { headers: headers })
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
  // Function      : updateUser
  // Params        : user data
  // Returns       : 
  // Author        : Rinsha
  // Date          : 21-03-2018
  // Last Modified : 21-03-2018, Rinsha
  // Desc          : 
  updateUser(profile) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'updateUser', profile, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getNewTaskRequestNotification
  // Params        : 
  // Returns       : notification info
  // Author        : Rinsha
  // Date          : 05-04-2018
  // Last Modified : 05-04-2018, Rinsha
  // Desc          : 
  getNewTaskRequestNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getNewTaskRequestNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTimeExtensionRequestNotification
  // Params        : 
  // Returns       : notification info
  // Author        : Rinsha
  // Date          : 05-04-2018
  // Last Modified : 05-04-2018, Rinsha
  // Desc          :  
  getTimeExtensionRequestNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getTimeExtensionRequestNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : close notification of time extension request approval
  // Params        : notification id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 05-04-2018
  // Last Modified : 05-04-2018, Rinsha
  // Desc          :  
  closeNotif(notif_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif/' + notif_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : close notification of new task request approval
  // Params        : notification id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 05-04-2018
  // Last Modified : 05-04-2018, Rinsha
  // Desc          :  
  closeNotif1(notif_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif1/' + notif_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : singleuserlog
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 16-03-2018
  // Last Modified : 
  // Desc          :user all activity log list
  getSingleUserActivitylog() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'singleuserlog', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
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
  // Function      : getSingleUserallleaves
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 19-03-2018
  // Last Modified : 
  // Desc          :get Single User all leaves
  getSingleUserallleaves() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'singleuserallleave', { headers: headers })
      .map(res => res.json());
  }
  // ---------------------------------Start-------------------------------------------
  // Function      : deleteEmpleave
  // Params        : user id
  // Returns       : 
  // Author        : sudha
  // Date          : 28-03-2018
  // Last Modified : 
  // Desc          : deleteuser leave
  //deleteuser leave
  deleteuserleave(id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'deleteuserleave/' + id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : addUserleave
  // Params        : data
  // Returns       : 
  // Author        : sudha
  // Date          : 28-03-2018
  // Last Modified : 
  // Desc          : add USER leave
  addUserleave(data: any) {
    // console.log(data)
    let headers = this.setHeaderWithAuthorization()
    return this.http.post(this.serviceUrl + 'adduserleave', data, { headers: headers })
      .map(res => res.json());
  }
  // < ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : singleuserleave
  // Params        : user leave id
  // Returns       : 
  // Author        : sudha
  // Date          :  28-03-2018
  // Last Modified : 
  // Desc          : single user leave
  //unblock User
  getSingleuserleave(id: any) {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + "singleuserleave/" + id, { headers: headers })
      .map(res => res.json())
  }

  // -----------------------------------End------------------------------------------
  //  ---------------------------------Start-------------------------------------------
  // Function      : updateUserleave
  // Params        : userleaveid
  // Returns       : 
  // Author        : sudha
  // Date          : 28-03-2018
  // Last Modified :
  // Desc          : to updateUserleave 
  updateUserleave(userleave: any) {
    // console.log(Empleave);
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'updateuserleave', userleave, { headers: headers })
      .map(res => res.json());
  }

  // < ----------------------------------End------------------------------------------- 
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyallrequest
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 19-03-2018
  // Last Modified : 
  // Desc          :get My all request
  getMyallrequest() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'allmyrequest', { headers: headers })
      .map(res => res.json());
  }
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyallTimeextnrequest
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 19-03-2018
  // Last Modified : 
  // Desc          :get my time extension request
  getMyallTimeextnrequest() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'mytimeextrequest', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyallnewtaskrequest
  // Params        : 
  // Returns       : 
  // Author        : sudha
  // Date          : 19-03-2018
  // Last Modified : 
  // Desc          :get my all new task request
  getMyallnewtaskrequest() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'mynewtaskrequest', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getAllProject
  // Params        : 
  // Returns       : all projects
  // Author        : sudha  
  // Date          : 21-03-2018
  // Last Modified :
  // Desc          : 
  getAllProject() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "allProjects", { headers: headers })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getProjectdetails
  // Params        :  id
  // Returns       : 
  // Author        : sudha
  // Date          : 10-04-2018
  // Last Modified : 
  // Desc          : project details(dashboard)
  //projectdetails
  getProjectdetails(id: any) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "projectdetails/" + id, { headers: headers })
      .map(res => res.json())
  }

  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getallprojectspercentage
  // Params        :  id
  // Returns       : 
  // Author        : sudha
  // Date          : 10-04-2018
  // Last Modified : 
  // Desc          : projectspercentage details(dashboard)
  //projectdetails
  getallprojectspercentage(id: any) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "projectspercentage/" + id, { headers: headers })
      .map(res => res.json())
  }

  // -----------------------------------End------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : getallprojectsvsstatus
  // Params        :  id
  // Returns       : 
  // Author        : sudha
  // Date          : 10-04-2018
  // Last Modified : 
  // Desc          : projects vs status details(dashboard)
  //projectdetails
  getallprojectsvsstatus() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "allprojectsvsstatus/", { headers: headers })
      .map(res => res.json())
  }

  // -----------------------------------End------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getAllMyTimeextensionrequest
  // Params        : 
  // Returns       : 
  // Author        : sudha  
  // Date          : 29-03-2018
  // Last Modified :
  // Desc          : 
  getAllMyTimeextensionrequest() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + "allmytimeextrequest", { headers: headers })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
  // ---------------------------------Start------------------------------------------------
  // Function      : getAllMyNewTaskrequest
  // Params        : 
  // Returns       : 
  // Author        : sudha  
  // Date          : 29-03-2018
  // Last Modified :
  // Desc          : 
  getAllMyNewTaskrequest() {
    let headers = this.setHeaderWithAuthorization()
    return this.http.get(this.serviceUrl + "allmynewtaskrequest", { headers: headers })
      .map(res => res.json());
  }
  // ---------------------------------------End--------------------------------------------
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
  // Function      : completeATask
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  addTimeAssoc(time) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'add-time-assoc', time, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : changeStausColor
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  changeStausColor(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'changeStausColor/' + task, {}, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : completeATask
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  holdTask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'hold-a-task', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getMyTasksPaused
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  donetask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'done-a-task', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : completeATask
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  completeTask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'complete-a-task', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : completeATask
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  resumeTasks(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'resume-a-task', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------

  // ---------------------------------Start-------------------------------------------
  // Function      : leavenotif 
  // Params        : 
  // Returns       : 
  // Author        : Rinsha
  // Date          : 23-05-2018
  // Last Modified : 
  // Desc          : employee leave notification
  leaveRequestNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'leavenotif', { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : close notification of leave request
  // Params        : notification id
  // Returns       : 
  // Author        : Rinsha
  // Date          : 23-05-2018
  // Last Modified : 23-05-2018, Rinsha 
  closeNotif2(notif_id) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeNotif2/' + notif_id, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : isTeamHeadForAnyTasks
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 30-07-2018
  // Last Modified : 30-07-2018, Yasir Poongadan 
  isTeamHeadForAnyTasks() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'isTeamHeadForAnyTasks', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
    // ---------------------------------Start-------------------------------------------
  // Function      : getVerificationTasks
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 30-07-2018
  // Last Modified : 30-07-2018, Yasir Poongadan
  // Desc          : 
  getVerificationTasks(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'getVerificationTasks', task, { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : completeATask
  // Params        : 
  // Returns       : 
  // Author        : Jooshifa
  // Date          : 29-03-2018
  // Last Modified : 29-03-2018, Jooshifa
  // Desc          : 
  verifyTask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'verifyTask', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : resubmitTask
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan
  // Date          : 01-08-2018
  // Last Modified : 01-08-2018, Yasir Poongadan
  // Desc          : 
  resubmitTask(task) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.post(this.serviceUrl + 'resubmitTask', (task), { headers: headers })
      .map(res => res.json());
  }
  // ----------------------------------End-------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : getTaskVerificationNotification
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan 
  // Date          : 01-08-2018
  // Last Modified : 01-08-2018, Yasir Poongadan
  // Desc          :  
  getTaskVerificationNotification() {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'getTaskVerificationNotification', { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
  // ---------------------------------Start-------------------------------------------
  // Function      : closeTaskVerifNotification
  // Params        : 
  // Returns       : 
  // Author        : Yasir Poongadan 
  // Date          : 01-08-2018
  // Last Modified : 01-08-2018, Yasir Poongadan
  // Desc          :  
  closeTaskVerifNotification(taskId) {
    let headers = this.setHeaderWithAuthorization();
    return this.http.get(this.serviceUrl + 'closeTaskVerifNotification/' + taskId, { headers: headers })
      .map(res => res.json());
  }
  // -----------------------------------End------------------------------------------
}
