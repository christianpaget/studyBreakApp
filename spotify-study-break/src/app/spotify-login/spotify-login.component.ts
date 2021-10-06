import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  login(){
    let redirect_uri = environment.redirect_uri;
    let apiUrl = environment.apiUrl;
    let params = {redirect_uri: redirect_uri};
    this.http.post(apiUrl + "/spotify/login", params).subscribe((data)=>{
        let url = data['link'];
        document.location.href = url;
      });
  }

}
