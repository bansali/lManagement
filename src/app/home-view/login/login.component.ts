import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { AppstoreService } from '../../shared/services/appstore.service';
import { FacebookService, InitParams,LoginResponse, LoginOptions } from 'ngx-facebook';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  accessToken1;
  user:User={
    userName:'',
    role:'',
    emailId:'',
    userId:'',
  password:'',
  _id:''
  };
  constructor(private socialAuthService: AuthService,
    private fb: FacebookService,
    private appStoreService: AppstoreService,
  private route:Router) { 
    //  let initParams: InitParams = {
    //     appId: '275937912957124',
    //     xfbml: true,
    //     version: 'v2.8'
    //   };
    //   fb.init(initParams);
    }
 
  ngOnInit() {
  }
  formSubmitted() {
    console.log(this.form.value);
    this.appStoreService.authenticate(this.form.value).subscribe((resp) => {
    console.log(resp.token);
    });
  }
  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      console.log('in facebook');
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      console.log(socialPlatformProvider)
      // this.facebookLogin();
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      console.log(socialPlatformProvider)
    }else{
      //do nothing
    }
    console.log('coming here');
    this.socialAuthService.signIn(socialPlatformProvider)
    .then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        console.log(userData.id);
        //  {userName: userData.name, userId: userData.id,email:userData.email}
       
        this.user.userName= userData.name;
        this.user.emailId = userData.email;
        this.user.userId = userData.id;
        this.user.role = "user";
        console.log(this.user);
        this.appStoreService.signupUsingSocialLogin(this.user)
        .subscribe((resp) => {
          console.log(resp);
          this.appStoreService.currentUser 
          = {_id:resp.result._id,
            emailId:resp.result.emailId,
            role:resp.result.role,
            userId:resp.result.userId,
            userName:resp.result.userName,
            address:resp.result.address,
            genre:resp.result.genre,
            profilePic:resp.result.profilePic
          };
          console.log(this.appStoreService.currentUser)
          this.route.navigate(['get-books']); 
        });
          }
    );
  }
  // facebookLogin(){
  //   var options: LoginOptions = {
  //     scope: 'public_profile,user_friends',
  //     return_scopes: true,
  //     enable_profile_selector: true
  //   };
  //   this.fb.login(options)
  //     .then((response: LoginResponse) =>{
  //     this.appStoreService.currentUser.userId = response.authResponse.userID;
      
      
  //        this.accessToken1 = response.authResponse.accessToken;
  //       console.log(response)
  //       // this.route.navigate(['user-home']);  
  //     })
  //     .catch((error: any) => console.error(error));  
      
  // }
  
  // accessFriendList(){

// var resp=    this.fb.getLoginStatus()
// console.log(resp);
  //   this.fb.api(
  //     "/2175073589377397/").then(res=>{console.log(res)})
  // }
  // ,{accessToken:this.accessToken1}
  //  onSignIn(googleUser) {
  //   const profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
  // signOut() {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
  socialLogout() {
    console.log(this.fb.getLoginStatus())
    this.fb.logout().then(() => {console.log('Logged out!')
    console.log(this.fb.getLoginStatus())
    });

    // this.socialAuthService.signOut();
    console.log(this.fb.getLoginStatus())
  }
}
