import { Component, OnInit } from '@angular/core';
import { login } from './login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  title = 'Study Break with Spotify';

  message = 'Study Break is a tool that lets you take control of your study sessions! Log in using your Spotify account and try it out!'
  loginModel = new login("", "");
  constructor(private http: HttpClient, private router: Router) { }
  data;
  //invocation = new XMLHttpRequest();
  //url = "http://localhost:8000/api/login";
  url = environment.apiUrl;
  ngOnInit(): void {
  }
  failedLogin(){
    document.getElementById('loginFail').innerHTML = "Invalid Login";
  }
  redirectSuccess(){
      this.router.navigate(['/user_home']);
    }
  logIn(){
    console.log("Spotify Log in Clicked")
    let redirect_uri = environment.redirect_uri;
    let apiUrl = environment.apiUrl;
    let params = {redirect_uri: redirect_uri};
    this.http.post(apiUrl + "/spotify/login", params).subscribe((data)=>{
        let url = data['link'];
        document.location.href = url;
      });
  }
  /*logIn(form: any): void{
      //let params = JSON.stringify(this.loginModel);
      let params = this.loginModel;
      const headers = {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
        })
      };
      const options = {
        responseType: 'text' as const,
      };
      console.log(params);
      this.http.post<any>(this.url + "/login" , params, headers).subscribe((data) =>{
          this.data = data;
          console.log('Response: ', data);
          //data = JSON.parse(data);
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
          else if(error==400){
            console.log("Bad Request");
          }
          //console.log(this.data);
  });
    }*/
  }

