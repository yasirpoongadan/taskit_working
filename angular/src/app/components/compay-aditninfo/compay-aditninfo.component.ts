import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service'
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
	selector: 'compay-aditninfo',
	templateUrl: './compay-aditninfo.component.html',
	styleUrls: ['./compay-aditninfo.component.css']
})
export class CompayAditninfoComponent implements OnInit {
	reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	timestamp = new Date().getTime().toString();
	spinner: Boolean = false;
	sub: any;
	p_id: '';
	questions = [{
		// 	question:"What's your Email?",
		// 	type:"text",
		// 	ans:""
		// },
		// {
		question: "What's your Company Name?",
		type: "text",
		ans: "",
		length: 100
	},
	{
		question: "Your Company Code?",
		type: "text",
		ans: "",
		length: 3
	},
	{
		question: "Industry?",
		type: "multiple",
		ans: ""
	},
	{
		question: "Your Contact Number ?",
		type: "text",
		ans: "",
		length: 100
	},
	{
		question: "Company Size?",
		type: "multiple",
		ans: ""
	},
	{
		question: "Why are you looking for task managment software?",
		type: "text",
		ans: "",
		length: 100
	}
		// {
		// 	question:"Your Password",
		// 	type:"password",
		// 	ans:""
		// },
		// {
		// 	question:"Confirm Password",
		// 	type:"password",
		// 	ans:""
		// },
	];
	array = [];
	industry: any;
	cmpSize: any;
	errMessage = '';
	counter = 0;
	progressBarWidth = 0;
	newReg = {
		company_name: '',
		company_code: '',
		contact_no: '',
		email: '',
		company_strength: '',
		industry: '',
		password: '',
		why_choosen: '',
		verification_code: this.timestamp + Math.floor(100000 + Math.random() * 900000),

	}
	constructor(private adminService: AdminService, public snackBar: MatSnackBar, private routes: Router, private companyService: CompanyService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.p_id = params.id;
			// console.log("sub");
			this.companyService.getCompanyDetailsById(this.p_id).subscribe(data => {
				// console.log("data" + data.is_profile_completed);
				if (data.is_profile_completed == true) {
					this.companyService.generateToken(params.id).subscribe(data4 => {
						if (data4.success == true) {
							this.companyService.storeUserData(data4.token, data4.login);
							if (data.cmp_status == "Expired") {
								this.routes.navigate(['/expired']);
							} else {
								this.routes.navigate(['/company-dashboard']);
							}
						}
					});

					// console.log("completed");
				}
				else {
					this.companyService.generateToken(params.id).subscribe(data3 => {
						if (data3.success) {
							this.companyService.storeUserData(data3.token, data3.login);
						}
					});
				}

			});
		});


		// this.companyService.getLoggedUSerDetails().subscribe(info => {
			// console.log("sdsss" + info);
			// if(info == null || info == ''){
			//   this.routes.navigate(['/clogin']); 
			// }
			// if(info.role == "admin"){
			//   this.routes.navigate(['/admin-dashboard']);
			// }
			// if(info.role == "user"){
			//   if(info.delete_status == true || info.block_status == true){
			// 	this.routes.navigate(['/404']); 
			//   }
			//   this.routes.navigate(['/survey', info.surveyId]); 
			// }
			// if(info.role == "company"){
			//   if(info.delete_status == true || info.block_status == true || info.cmp_status == "Not Verified"){
			// 	this.routes.navigate(['/clogin']); 
			//   }
			//   if(info.cmp_status == "Expired"){
			// 	this.routes.navigate(['/expired']);
			//   }
			//   if(info.is_profile_completed == false){
			// 	this.routes.navigate(['/additnInfo', info.id]);
			//   }
			// }
		// });
		// console.log(this.questions);
		this.getIndustries();
		this.getCompanySize();
	}

	register() {
		this.questions.push({ question: '', type: '', ans: this.p_id });
		this.companyService.registerCompanyFromadtninfo(this.questions).subscribe(resData => {
			this.spinner = true
			// console.log(resData)
			this.industry = resData;
			if (resData.success == true) {
				this.spinner = false
				let snackBarRef = this.snackBar.open('Redirecting into your account.', '', {
					duration: 2000
				});
				this.routes.navigate(['/company-dashboard']);
			} else {
				this.spinner = false
				// this._flashMessagesService.show('Error', { cssClass: 'alert-danger', timeout: 4000 });
				let snackBarRef = this.snackBar.open('Error', '', {
					duration: 2000
				});
				this.routes.navigate(['/404']);
			}
		});
	}

	getIndustries() {
		this.companyService.getIndustries().subscribe(resData => {
			// console.log(resData)
			this.industry = resData;
			// console.log(this.industry)

		});
	}

	getCompanySize() {
		this.companyService.getCompanySize().subscribe(resData => {
			// console.log(resData)
			this.cmpSize = resData;

		});
	}
	addCounter() {
		this.counter = this.counter + 1;
		this.progressBarWidth = (this.counter / 8) * 100;
		// console.log(this.progressBarWidth);

	}


	validate(i) {

		if (this.questions[this.counter].ans == '') {
			this.errMessage = "Please fill the fields";
		}
		else if (i == 3) {
			if (!(/^\d+$/.test(this.questions[3].ans)) || (this.questions[3].ans.length<10)) {
				this.errMessage = "Enter valid phone number!";
			}
			else {
				this.errMessage = "";
				this.addCounter();

			}
		}
		else {
			this.errMessage = "";
			this.addCounter();

		}
		console.log(this.counter);
		
	}

	subCount(i){
		this.counter = this.counter-1;
	}
}
