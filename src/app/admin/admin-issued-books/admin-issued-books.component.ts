import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { AppstoreService } from '../../shared/services/appstore.service';
import {MatSort, MatTableDataSource} from '@angular/material';
export interface AuthorBookIssueDetail  {
  position:number;
  bookIssueId:string;
  bookTitle:string
  author:[string];
  userId:number;
  userName:string;
  issuedDate:string;
}

@Component({
  selector: 'app-admin-issued-books',
  templateUrl: './admin-issued-books.component.html',
  styleUrls: ['./admin-issued-books.component.css']
})

export class AdminIssuedBooksComponent implements OnInit {

  displayedColumns: string[] = ['position', 'bookTitle', 'author', 'userId','userName','issuedDate'];
  ELEMENT_DATA:AuthorBookIssueDetail[]=[];
  dataSource =new MatTableDataSource(this.ELEMENT_DATA);
  dataPopulate:boolean = false;
  constructor(private appStore:AppstoreService) { }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    console.log(this.dataSource)
    this.appStore.getAllIssuedBooks()
    .subscribe(resp=>{
      console.log(resp);
      this.populateData(resp.result);
    });
   
  }
  populateData(bookIssueDetail){
    console.log(bookIssueDetail);
    
    for(var i=0;i<bookIssueDetail.length;i++){
      console.log(bookIssueDetail[i]);
      this.ELEMENT_DATA.push({
        author:bookIssueDetail[i].book.author,
        bookIssueId:bookIssueDetail[i]._id,
        bookTitle:bookIssueDetail[i].book.bookTitle,
        issuedDate:bookIssueDetail[i].issuedDate,
        position:i+1,
        userId:bookIssueDetail[i].profile.userId,
        userName:bookIssueDetail[i].profile.userName
      })
      // this.ELEMENT_DATA[i].position= i+1;
      // this.ELEMENT_DATA[i].bookIssueId= bookIssueDetail[i]._id;
      // this.ELEMENT_DATA[i].bookTitle=bookIssueDetail[i].book.bookTitle;
      // this.ELEMENT_DATA[i].author=bookIssueDetail[i].book.author;
      // this.ELEMENT_DATA[i].userId=bookIssueDetail[i].profile.userId;
      // this.ELEMENT_DATA[i].userName=bookIssueDetail[i].profile.userName;
      // this.ELEMENT_DATA[i].issuedDate= bookIssueDetail[i].issuedDate;
    }
    console.log(this.ELEMENT_DATA);
    console.log(this.dataSource);
    this.dataPopulate =true;
  }
  headerClicked(){
    console.log('header clicked')
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
