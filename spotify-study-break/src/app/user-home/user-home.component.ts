import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { newPlaylist } from '../new-playlist-form/newPlaylist';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
	user: string;
	playlists;
  constructor(private http: HttpClient, private router: Router) { }
  playlistsLength = 0;
  ngOnInit(){
    if(!window.localStorage.getItem('user')){
       this.router.navigate(['/login']);
       alert('You must be logged in to access this page');
    }
    this.user = window.localStorage.getItem('user');
  	let temp = {user: this.user}
    let param = JSON.stringify(temp);
    this.http.post<newPlaylist>('http://localhost/api/getUserPlaylists.php', param).subscribe((playlists)=>{
  		this.playlists = playlists;
      this.playlistsLength = this.playlists.length;
  	})
  }
  listen(id){

  }
  deletePlaylist(id){

  }
}
