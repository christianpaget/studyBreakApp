import { Component, OnInit } from '@angular/core';
import { login } from './login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  title = 'Study Break with Spotify';

  message = 'Study Break is a tool that lets you take control of your study sessions! Listen to your preferred study music for an amount of time that you choose, and when it\'s time for a break, the music changes\!\
  When the music returns to your study music, you know it\'s time to get back to work. Log in using your Spotify account and try it out!'
  loginModel = new login("", "");
  constructor(private http: HttpClient, private router: Router) { }
  data;
  //invocation = new XMLHttpRequest();
  url = "http://localhost:2060/login.php";
  ngOnInit(): void {
  }
  failedLogin(){
    document.getElementById('loginFail').innerHTML = "Invalid Login";
  }
  redirectSuccess(){
      this.router.navigate(['/homepage']);
    }
  logIn(form: any): void{
      let params = JSON.stringify(this.loginModel);
      console.log(params);
      this.http.post<any>("http://localhost:2060/login.php", params, {responseType: 'text' as 'json'}).subscribe((data) =>{
          this.data = data;
          console.log('Response: ', data);
          data = JSON.parse(data);
          if(data['message']=='Success'){
            this.redirectSuccess();
            window.localStorage.setItem('user', data['user']);
          }
          else if(data['message']!='Success'){
            this.failedLogin();
          }
        }, (error) =>{
          if(error==201){
            //this.redirectSuccess();
          }
          //console.log(this.data);
  });
    }
  }

