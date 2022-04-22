import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from './playlist';
import { newPlaylist } from './new-playlist-form/newPlaylist';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	EXPRESS_API_SERVER = environment.apiUrl;

	klaviyoPublicKey = "VC8jcn"; //Safe to expose

	spotifyApiBaseUrl = 'https://api.spotify.com/v1/me/player/'
	readPlaylists(): Observable<newPlaylist[]> {
		return this.httpClient.get<newPlaylist[]>(`${this.EXPRESS_API_SERVER}/api/userRows`);
	}

	queue(spotifyInfo, token){
		let song = spotifyInfo['name']
		let uri = spotifyInfo['uri']
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
		this.httpClient.post(this.spotifyApiBaseUrl + 'queue?uri=' + uri, '', { headers: headers }).subscribe((response) => {
			console.log("Queued: " + song + " in api.queue function");
		});
	}

	getCurrentSongPlaying(token){
		console.log("Playback API")
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
		return this.httpClient.get(this.spotifyApiBaseUrl, { headers: headers})/*.subscribe((response) => {
			console.log(response);
			//let responseBody = JSON.parse(response.toString());
			//console.log(responseBody);
			let songUri = response['item']['uri']
			console.log(songUri);
			return songUri;
		});*/
	}


	constructor(private httpClient: HttpClient) { }
}
