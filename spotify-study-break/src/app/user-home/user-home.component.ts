import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { newPlaylist } from '../new-playlist-form/newPlaylist';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
	user = 'User';
	playlists;//: newPlaylist[];
  constructor(private http: HttpClient) { }

  ngOnInit(){
  	this.http.get<newPlaylist>('http://localhost/api/read.php').subscribe((playlists)=>{
  		this.playlists = playlists;
  	})
  }

}
