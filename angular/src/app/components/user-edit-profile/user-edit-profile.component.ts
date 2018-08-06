import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit {
  preloader :Boolean = false
  sub: any;
  user_id: any;
  profile = {
    f_name: '',
    l_name: '',
    gender: '',
    contact_no: '',
    password: '',
    c_password: '',
    imgSrc : '',
    imgFile : [],
  }

  constructor(private userService: UserService, private _formBuilder: FormBuilder, private routes: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.preloader = true;
    this.getProfile();
  }

  getProfile() {
    // ---------------------------------Start-------------------------------------------
    // Function      : getProfile
    // Params        : 
    // Returns       : logged in user details
    // Author        : Rinsha
    // Date          : 21-03-2018
    // Last Modified : 21-03-2018, Rinsha
    // Desc          : 
    this.userService.getProfile().subscribe(info => {
      this.preloader = false;
      // console.log(info);
      this.profile = info;
      this.profile.c_password = '';
      this.profile.password = '';
      this.user_id = info.id;
      if(info.tbl_login.profile_image == ''){
        this.profile.imgSrc = "../assets/images/dp.jpg";
      }
      else{
        this.profile.imgSrc = "../assets/profile_upload/"+info.tbl_login.profile_image;
      }
    });
    // ---------------------------------End-------------------------------------------
  }

  updateUser(profile) {
    // console.log(profile);
    // ---------------------------------Start-------------------------------------------
    // Function      : updateUser
    // Params        : user data
    // Returns       : 
    // Author        : Rinsha
    // Date          : 21-03-2018
    // Last Modified : 21-03-2018, Rinsha
    // Desc          : 
    this.userService.updateUser(profile).subscribe(info => {
      let snackBarRef = this.snackBar.open(info.msg, '', {
        duration: 3000
      });
      if (info.success == true) {
        this.routes.navigate(['/user-dashboard']);
      }
    });
    // ---------------------------------End-------------------------------------------
  }

  displayPhoto(fileInput){
    var ext = fileInput.target.files[0].name.split('.').pop().toLowerCase();
    if (['gif','png','jpg','jpeg'].indexOf(ext) < 0) {
     // fileInput.target.files.remove(0);
    
      this.profile.imgSrc = '';
      alert('Please select a valid image [ jpg | jpeg | gif | png ]');
      return false;
    }
    //this.newUser.imgFile =ext;
    // console.log(fileInput);
    this.profile.imgFile = fileInput.target.files[0];
    
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
    
      reader.onload = ((e) => {
        this.profile.imgSrc = e.target['result'];
      });
    
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
