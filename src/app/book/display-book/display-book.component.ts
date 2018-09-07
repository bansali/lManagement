import { Component, OnInit } from '@angular/core';
import { AppstoreService } from '../../shared/services/appstore.service';
import { Books } from '../../shared/models/bookModel';
import { BookIssueDetail } from '../../shared/models/bookIssueDetailModel';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent implements OnInit {
currentBook:Books;
bookAvaliable:boolean=false;
bookIssueDetail;

  constructor(private appStore:AppstoreService) { 
    
  }

  ngOnInit() {
    this.currentBook = this.appStore.currentBook;
    console.log(this.currentBook)
    if(this.currentBook.remainingBooks>0){
      this.bookAvaliable = true;
    } else{
      this.bookAvaliable= false;
    }
  }
  bookIssue(){
    if(this.currentBook.remainingBooks>0){
      // fill details of recipient 
      var today =new Date();
      var retday = this.addDays(new Date(), 15);
      console.log(today.getDate(),today.getMonth(),today.getFullYear());
      console.log(retday.getDate(),retday.getMonth());
      var issDate = today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear();
      var retDate = retday.getDate()+'/'+retday.getMonth()+'/'+retday.getFullYear();
      console.log(issDate,'              ',retDate);
      this.bookIssueDetail={
        issuedDate:issDate,
        returnDate:retDate,
        profile:this.appStore.currentUser._id,
        book:this.currentBook._id
      }
      console.log(this.bookIssueDetail);
      console.log(this.appStore.currentUser._id ,'is current user profile id');
      
      this.appStore.bookissue(this.bookIssueDetail).subscribe(resp=>{
        console.log('in resp of book issue');
        console.log(resp);
      });
      // update book count in library
      this.appStore.updateBookCount({isbn:this.currentBook.isbn,remainingBooks:this.currentBook.remainingBooks-1})
      .subscribe(resp=>{
        console.log('in update book count:');
        console.log(resp);
      }); 
    }
  }
  addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  }
}
