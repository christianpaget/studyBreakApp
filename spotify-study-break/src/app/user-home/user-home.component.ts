import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { newPlaylist } from '../new-playlist-form/newPlaylist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
	user: string;
	playlists;
  authToken;
  spotId;
  url = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }
  playlistsLength = 0;
  ngOnInit(){
    // Grab auth_token from Spotify Redirect
    if(!window.localStorage.getItem('auth_token') || window.localStorage.getItem('auth_token')==undefined){
      //this.activatedRoute.queryParams.subscribe(params => {
      let params = this.activatedRoute.snapshot.fragment;

      if ( params != undefined) {
        let token = params.split('&')[0];
        let arg = token.split('=');
          console.log(arg[1]);
          if(arg[1])
            window.localStorage.setItem('auth_token', arg[1]);
            this.authToken = arg[1];
      }
    }
    //console.log(window.localStorage.getItem('auth_token'));
  
  //Restrict access to log in only section
  /*
    if(!window.localStorage.getItem('user')){
       this.router.navigate(['/login']);
       alert('You must be logged in to access this page');
    }*/

  //Get playlists of logged in user
  if(!window.localStorage.getItem('id')){
    let token = this.authToken
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    console.log(headers);
    this.http.get("https://api.spotify.com/v1/me", headers).subscribe((userMetaData)=>{
      //console.log(userMetaData);
      this.user = userMetaData['display_name'];
      this.spotId = userMetaData['id'];
      window.localStorage.setItem('user', this.user);
      window.localStorage.setItem('id', this.spotId);
    });
  }
  this.user = window.localStorage.getItem('user')
  let userSpotID = window.localStorage.getItem('id');
  //console.log(userSpotID)
    const playlistHeaders = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'userID': userSpotID
      })
    };
    this.http.get(this.url + '/userRows', playlistHeaders).subscribe((playlists)=>{
      this.playlists = playlists;
      this.playlistsLength = this.playlists.length;
    })
  
  }
  listen(data: newPlaylist){
    this.router.navigate(['/spotify-player', data]);
  }
  deletePlaylist(id){

  }
}
