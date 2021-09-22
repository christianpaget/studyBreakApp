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
  	//document.location.href = 'https://accounts.spotify.com/authorize?client_id=' + this.spotifyID + '&redirect_uri=' + this.redirect_uri
  	//+ '&scope=user-modify-playback-state%20streaming%20user-read-private%20user-read-email&response_type=token';
    let apiUrl = environment.apiUrl;
    let params = {redirect_uri: this.redirect_uri};
    this.http.post(apiUrl + "/spotify/login", params).subscribe((error) =>{
        console.log('Error: ', error);
      });
  }
  //redirect_uri = 'http:%2F%2Flocalhost:4200%2Fhomepage';
  redirect_uri = environment.redirect_uri;
  spotifyID = 'a466c513c83a43809ffe7f0573d24418';
  spotifySecret = '0575752dbd7e41ac964f63c60342308e';

}
