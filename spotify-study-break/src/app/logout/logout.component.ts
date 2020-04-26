import { Component, OnInit } from '@angular/core';
//import { logout } from './logout';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  redirectSuccess(){
    this.router.navigate(['/login']);
  }

  logout(): void {
    //console.log("function called")
    //window.localStorage.removeItem('user');
    window.localStorage.clear();
    this.redirectSuccess();
  }

}
