import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppstoreService } from '../../shared/services/appstore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router,private appStore:AppstoreService) { }

  ngOnInit() {
  }
  loginandout() {
    console.log('btn loginout clicked');
    this.route.navigate(['login']);
  }
  register() {
    console.log('btn register clicked');
    this.route.navigate(['register']);
  }
  home(){
    this.route.navigate(['']);
  }
  menuHome(){
    console.log('home')
    this.route.navigate(['get-books']);
  }
  menuProfile(){
    console.log('profile')
    this.route.navigate(['profile']);
  }
  menuMyBooks(){
    console.log('my books')
    this.route.navigate(['my-books']);
  }
  menuSuggestions(){
    console.log('suggestions')
    this.route.navigate(['suggestions']);
  }
  menuIssuedBooks(){
    this.route.navigate(['admin-issued-books']);
  }
  menuAddBook(){
    this.route.navigate(['add-books']);
  }
}
