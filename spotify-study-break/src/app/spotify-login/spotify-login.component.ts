import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css']
})
export class SpotifyLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  login(){
  	document.location.href = 'https://accounts.spotify.com/authorize?client_id=' + this.spotifyID + '&redirect_uri=' + this.redirect_uri
  	+ '&scope=user-read-currently-playing%20user-read-playback-state&response_type=token';
  }
  redirect_uri = 'http:%2F%2Flocalhost:4200%2Fhomepage';
  spotifyID = 'a466c513c83a43809ffe7f0573d24418';
  spotifySecret = '0575752dbd7e41ac964f63c60342308e';

}
