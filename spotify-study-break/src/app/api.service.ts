import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from './playlist';
import { newPlaylist } from './new-playlist-form/newPlaylist';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	//PHP_API_SERVER = "http://3.92.60.217/api/login.php";
	EXPRESS_API_SERVER = environment.apiUrl;

	readPlaylists(): Observable<newPlaylist[]>{
		return this.httpClient.get<newPlaylist[]>(`${this.EXPRESS_API_SERVER}/api/userRows`);
	}

	
  constructor(private httpClient: HttpClient) { }
}
