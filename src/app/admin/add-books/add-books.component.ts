import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppstoreService } from '../../shared/services/appstore.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {
  // addBookForm: FormGroup;
  @ViewChild('f') form: NgForm;
  image ;
  fileToUpload: any;
  allowedTypes: any;
  addBookForm: FormGroup;
  Isbn:string="";
  // 9781451648546
  constructor(private appStore: AppstoreService,private route: Router) {
  }

  ngOnInit() {

  }

    formSubmitted() {
        console.log(this.form.value);
        this.appStore.addBook(this.form.value).subscribe((resp) => {
          console.log (resp);
       });
    }
    addBookViaISBN(){
      console.log(this.Isbn)
      this.appStore.addBookByIsbn(this.Isbn,10).subscribe((resp)=>{
        console.log(resp);
      });
    }
    back(){
      this.route.navigate(['admin-home']);
    }
  }
