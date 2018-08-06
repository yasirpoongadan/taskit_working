import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { CompanyService } from './../../services/company.service'
import { FocusDirective } from './../../app.myfocus';
declare var $:any;
@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.css']
})


export class CompanySignupComponent implements OnInit {
// @ViewChild('fieldName1')	
// fieldName1: any;
  timestamp = new Date().getTime().toString();
	questions = [{
		question:"What's your Email?",
		type:"text",
		ans:"",
		length:100
	},
	{
		question:"What's your Company Name?",
		type:"text",
		ans:"",
		length:100	
	},
	{
		question:"Your Company Code?",
		type:"text",
		ans:"",
		length:3		
	},
	{
		question:"Industry?",
		type:"multiple",
		ans:"",
		length:100		
	},
	{
		question:"Your Contact Number ?",
		type:"text",
		ans:"",
		length:100		
	},
	{
		question:"Company Size?",
		type:"multiple",
		ans:"",
		length:100		
	},
	{
		question:"Why are you looking for task managment software?",
		type:"text",
		ans:"",
		length:100		
	},
	{
		question:"Your Password",
		type:"password",
		ans:"",
		length:100		
	},
	{
		question:"Confirm Password",
		type:"password",
		ans:"",
		length:100		
	},
	
];
industry :any;
cmpSize :any;
errMessage = '';
counter = 0;
counter2 = 0;
now = 0;
progressBarWidth =0;
registr = false;
ssMsg='';
showLoader = false;
passMessage ="Password contain atleast 6 characters and should contain one number,one character and one special character"
reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
xd = false;
    verification_code= this.timestamp + Math.floor(100000 + Math.random() * 900000);
		
 constructor(private companyService: CompanyService) { }

  ngOnInit() {
		console.log(this.questions);
		this.getIndustries();
		this.getCompanySize();
  }
	register(){
		
			if(this.questions[7].ans == this.questions[8].ans){
			this.errMessage = "";
			this.registr = true;
			
				this.showLoader = true;
				this.questions.push({question:'verification',type:'text',ans:this.verification_code,length:1})
				this.companyService.registerCompany(this.questions).subscribe(resData =>{
					this.showLoader = false;
					
					this.ssMsg = resData.message;
   				 });
					
			}
			else{
			this.errMessage = "Password doesn't match!";
				
			}
      
		
	}
	
	getIndustries(){
		this.companyService.getIndustries().subscribe(resData =>{
      // console.log(resData)
			this.industry = resData;
			// console.log(this.industry)
      
    });
	}

	getCompanySize(){
		this.companyService.getCompanySize().subscribe(resData =>{
      // console.log(resData)
     this.cmpSize = resData;
      
    });
	}


ValidateEmail(mail) 
{
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    
    return (false)
}

	addCounter(){
		// if(this.counter == 0){
		// 	if(this.ValidateEmail(this.questions[this.counter].ans)){
		// 	this.errMessage = "Invalid email address!";
				
		// 	}
		// }
		this.counter = this.counter+1;	
		if(this.progressBarWidth >= (this.counter/8)*100){

		}else {
			this.progressBarWidth = (this.counter/8)*100;
		}	
		// console.log(this.progressBarWidth );

	}
	subCount(i){
		this.counter = this.counter-1;
	}
	 validatePassword(password) {
        var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&.])[A-Za-z\d$@$!%*#?&.]{6,}$/;
        return re.test(password);
    }
	validate(i){
		// console.log(this.counter);
		// console.log(this.counter2);
		// i = i+1;
		// let id = "#"+i
		// // console.log(id)
		// this.xd = true;
		if(this.questions[this.counter].ans == ''){
			this.errMessage = "Please fill the fields";
		}
		else{
			if( i == 0){
				if(!this.reg.test(this.questions[0].ans.toLowerCase()) ){
					this.errMessage = "Enter valid email!";
				}else{
					this.companyService.checkEmailExist(this.questions[0].ans).subscribe(checkingdata =>{
						if(!checkingdata.success){
							this.errMessage = checkingdata.msg;
						}
						else{
							this.errMessage = "";
							this.addCounter();
						}
					});
				}
			}
			else if(i == 4){
				if (!(/^\d+$/.test(this.questions[4].ans)) || (this.questions[4].ans.length<10)) {
					this.errMessage = "Enter valid phone number!";
				}
				else{
					this.errMessage = "";
					this.addCounter();
				}
			}
			else if(i == 7){
				var strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
					if(this.validatePassword(this.questions[7].ans) == false){
					this.errMessage = "Invalid Password";
				}else{
					this.errMessage = "";
					this.addCounter();
				}
			}
			else{
				this.errMessage = '';
				this.addCounter();
			}
		}
	}
}
