import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
  loginandout() {
    console.log('btn loginout clicked');
    this.route.navigate(['admin-login']);
  }
  register() {
    console.log('btn register clicked');
    this.route.navigate(['register']);
  }
  addBooks() {
    this.route.navigate(['add-books']);
  }

}
