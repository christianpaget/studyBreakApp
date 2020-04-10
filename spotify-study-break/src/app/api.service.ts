import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from './playlist';
import { newPlaylist } from './new-playlist-form/newPlaylist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	PHP_API_SERVER = "http://127.0.0.1:80";
	readPlaylists(): Observable<newPlaylist[]>{
		return this.httpClient.get<newPlaylist[]>(`${this.PHP_API_SERVER}/api/read.php`);
	}
  constructor(private httpClient: HttpClient) { }
}
