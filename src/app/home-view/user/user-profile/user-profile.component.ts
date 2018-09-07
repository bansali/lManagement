import { Component, OnInit, ElementRef } from '@angular/core';
import { AppstoreService } from '../../../shared/services/appstore.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../../shared/models/userProfile';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfilePic:any;
  userProfile:UserProfile={
    userId:null,
    userName:null,
    profilePic:null,
    emailId:null,
    address:null,
    genre:null,
    role:null,
    _id:null
  };
  userProfileState:boolean = false;
  editProfileState:boolean = false;
  editProfileForm: FormGroup;
  constructor(private appStore:AppstoreService,
    private el: ElementRef,private router:Router) { }

  ngOnInit() {
    console.log('in profile with userid',this.appStore.currentUser.userId);
    this.appStore.getProfile(this.appStore.currentUser.userId).subscribe(user=>{
      console.log('in user');
      console.log(user);
      // this.appStore.currentUser = user.result;
      this.userProfile = user.result;
      this.userProfileState = true;
      this.getProfilePic();
      console.log(this.userProfile.userName);
    }) 
  }
  editProfile(){
    this.editProfileState=true;
    this.editProfileForm = new FormGroup({
      'userName' : new FormControl (this.userProfile.userName),
      'email': new FormControl ( this.userProfile.emailId)
    });
  }
  onSubmit( ) {
    console.log(this.editProfileForm.value);
  }
  upload() {
  //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
  //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
  //create a new fromdata instance
    let formData = new FormData();
  //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
        //append the key name 'photo' with the first file in the element
      console.log(inputEl.files.item(0));
      formData.append('photo', inputEl.files.item(0));
      console.log(formData);
      formData.append('userId',this.userProfile.userId);
      this.appStore.upload(formData)
      .subscribe((success) => {
        console.log(success);
        alert('uploaded');
        },
        (error) => alert(error)
      );
    }
  }
  getProfilePic(){
    console.log('coming to get profile pic')
    if(this.userProfile.profilePic){
      this.appStore.getProfilePic(this.userProfile.userId).subscribe(resp=>{
        console.log(resp);
        this.createImageFromBlob(resp);
      })
    }
  }
  createImageFromBlob(image :Blob){
    let reader = new FileReader;
    reader.addEventListener("load",()=>{
      this.userProfilePic = reader.result;
    },false);
    if(image){
      reader.readAsDataURL(image);
    }
  }
}
