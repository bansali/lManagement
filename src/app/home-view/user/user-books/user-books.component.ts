import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppstoreService } from '../../../shared/services/appstore.service';
import { Books } from '../../../shared/models/bookModel';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {
  issuedBookDetail;
  loading:boolean= true;
  constructor(private route:Router,private appStore:AppstoreService) { }

  ngOnInit() {
    this.appStore.getBooksInfo(this.appStore.currentUser._id)
    .subscribe(resp=>{
      console.log(resp);
      this.issuedBookDetail = resp.result;
      this.loading = false;
    })
  }
  bookReturn(issue){
    console.log(issue);
    var rBook = {
      profile:this.appStore.currentUser._id,
      book:issue.book._id,
      remainingBooks:issue.book.remainingBooks+1
    }
    console.log(rBook);
    this.appStore.returnBook(rBook)
    .subscribe(resp=>{
      console.log(resp);
    });
  }
  bookRenew(issue){
    console.log(issue);
    var detail = {_id:this.appStore.currentUser._id,
                  returnDate:'1/1/2019'}
                  console.log(detail);
    this.appStore.renewBook(detail)
    .subscribe(resp=>{
      console.log(resp);
    })
  }

}
