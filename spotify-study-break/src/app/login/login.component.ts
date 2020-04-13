import { Component, OnInit } from '@angular/core';
import { login } from './login';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  title = 'Spotify Study Break with Spotify';

  message = 'Study Break is a tool that lets you take control of your study sessions! Listen to your preferred study music for an amount of time that you choose, and when it\'s time for a break, the music changes\!\
  When the music returns to your study music, you know it\'s time to get back to work.You tell us your desired music to study to, music to take a break to, and how often/ how long your break is and we create\
  the perfect playlist\! Log in using your Spotify account and try it out!'
  loginModel = new login("", "");
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  logIn(form: any): void{
      let params = JSON.stringify(this.loginModel);
      console.log(params);
      this.http.post<login>('http://localhost/api/session.php', params).subscribe((data) =>{
          console.log('Response: ', data);
        }, (error) =>{
          if(error==201){
            //this.redirectSuccess();
          }
  });
    }
  }

