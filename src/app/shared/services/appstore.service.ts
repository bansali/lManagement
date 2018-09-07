import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Books } from '../models/bookModel';
import { User } from '../models/user';
import { AuthService } from 'angular5-social-login';
import { promise } from 'protractor';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Profile } from 'selenium-webdriver/firefox';
import { UserProfile } from '../models/userProfile';
import { BookIssueDetail } from '../models/bookIssueDetailModel';

@Injectable()
export class AppstoreService {
  currentUser:UserProfile = { userName: null,
    emailId: null,
    role:null,
    userId:null,
    _id:null,
    address:null,
    genre:null,
    profilePic:null
  };
  url = 'http://localhost:3000/books/';
  url1 = 'http://localhost:3000/user/register';
  url2 = 'http://localhost:3000/user/authenticate';
  url3 = 'http://localhost:3000/user/social-login';
  url4 = 'http://localhost:3000/profile/';
  url5 = 'http://localhost:3000/profile/update';
  url6 = 'http://localhost:3000/profile/get-profile-pic';
  url7 = 'http://localhost:3000/bookissue/';
  url8 = 'http://localhost:3000/books/get-book-by-isbn';
  url9 = 'http://localhost:3000/books/update-book-count'
  url10  = 'http://localhost:3000/bookissue/my-books';
  url11 = 'http://localhost:3000/bookissue/';
  url12 = 'http://localhost:3000/bookissue/return-book';
  url13 = 'http://localhost:3000/bookissue/renew';
  graphUrlBase = 'https://graph.facebook.com/';
  bookArray: Array<Books>;
  currentBook:Books=null;
  constructor(private socialAuthService: AuthService, private http: HttpClient ) { }

  register(user: User): Observable<any> {
    return this.http.post(this.url1, user);
  }

  authenticate(user: User): Observable<any> {
    console.log('In authenticate');
    return this.http.post(this.url2, user);
  }
  
  addBook(book: Books): Observable<any> {
    console.log(book.author)
    return this.http.post(this.url, book);
  }
  
  getBooks(): Observable<any> {
    return  this.http.get(this.url);
  }
  
  deleteBookByIsbn(id): Observable<any>  {
    return this.http.delete(this.url + id);
  }
  
  addBookByIsbn(isbn:string,givenQuantity): Observable<any> {
    console.log('in appstore');
    console.log(isbn)
  //  var isbnObj:{"isbn":string};
  //   isbnObj.isbn = <string>isbn;
  return this.http.post(this.url+'addUsingIsbn', {"isbn":isbn,"quantity":givenQuantity});
  }
  // socialLogin(socialPlatformProvider, socialPlatform): Promise<any> {
  //   return this.socialAuthService.signIn(socialPlatformProvider);
  // }
  // socialLogout(): Promise<any> {
  //   return this.socialAuthService.signOut();
  // }
  signupUsingSocialLogin(user:User): Observable<any> {
    console.log(user);
    // this.currentUser = user;
    return this.http.post(this.url3, user);
  }
  getProfile(userId) :Observable<any>{
    console.log('in app store get profile with id ' ,userId);
    return this.http.get(this.url4,{params:{userId:userId}}
    );
  }
  // getProfilePic(userId): Observable<any> {
  //   return this.http.get(this.graphUrlBase+userId+'/picture');
  // }
  upload(formdata):Observable <any>{
  return this.http.post(this.url5,formdata);
  }
  getProfilePic(userId):Observable<any>{
    console.log('in profile pic appstore:',userId)
    return this.http.get(this.url6,{params:{userId:userId},responseType: 'blob' });
  }
  bookissue(bookIssueDetail:any):Observable<any>{
    console.log('in app store book issue');
    console.log(bookIssueDetail);
    return this.http.post(this.url7,bookIssueDetail);
  }
  getBookByIsbn(givenisbn):Observable<any>{
    console.log('i appp store getbook by isbn :',givenisbn);
    return this.http.get(this.url8,{params:{isbn:givenisbn}});
  }
  updateBookCount(bookDetail):Observable<any>{
    console.log('in update book count app store');
    return this.http.put(this.url9,bookDetail);
  }
  getMyBooks(givenuserid):Observable<any>{
    console.log('in get my books with userid :',givenuserid);
    return this.http.get(this.url10,{params:{userId:givenuserid}});
  }
  getBooksInfo(given_id):Observable<any>{
    console.log('get books ',given_id);
    return this.http.get(this.url11+given_id);
  }
  //book return
  returnBook(bookIssueDetail):Observable<any>{
    console.log(bookIssueDetail);
    return this.http.put(this.url12,
      {profile:bookIssueDetail.profile,
              book:bookIssueDetail.book,
            remainingBooks:bookIssueDetail.remainingBooks});
  }
  //renew book
  renewBook(bookrenewDetail):Observable<any>{
    return this.http.patch(this.url13,{profile:bookrenewDetail._id,
    returnDate:bookrenewDetail.returnDate});
  }
  getAllIssuedBooks():Observable<any>{
    return this.http.get(this.url11);
  }
}
