import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppstoreService } from '../../shared/services/appstore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private appStoreService: AppstoreService) { }
  @ViewChild('f') form: NgForm;
  ngOnInit() {
  }
  formSubmitted() {
    console.log(this.form.value);
    this.appStoreService.register(this.form.value).subscribe((resp) => {
        console.log(resp);
    });
  }
}
