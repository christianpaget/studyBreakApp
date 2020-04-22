import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit {
	ngOnInit(): void {
  		if(!window.localStorage.getItem('auth_token') || window.localStorage.getItem('auth_token')==undefined){
  			this.router.navigate(['/spotify-login'])
  		}
  		this.loadSpotifyScript();
  		this.initializeSpotifyPlayer();
  		this.searchSpotify();
  		this.token = window.localStorage.getItem('auth_token');
  		//this.headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.token);
  }
  constructor(private router: Router, private http: HttpClient) { 
  	//this.loadSpotifyScript();
  	//this.initializeSpotifyPlayer();
  }
  token; //window.localStorage.getItem('auth_token');
  headers;//= new HttpHeaders().append('Authorization', 'Bearer ' + this.token)
  deviceID;
  player;
  spotifyID = 'a466c513c83a43809ffe7f0573d24418';
  spotifySecret = '0575752dbd7e41ac964f63c60342308e';
  tracks: [];
  searchSpotify(){
  	let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.token);
  	let token = window.localStorage.getItem('auth_token');
  	//headers = headers.append('Authorization', 'Bearer ' + token);
  	let q = 'artist:muse';
  	let type = 'track';
  	let params = new HttpParams().set('q', q).set('type', type);
  	this.http.get('https://api.spotify.com/v1/search', {headers: headers, params: params, responseType: 'text' as 'json'}).subscribe((response) =>{
  		console.log(response);
  		let output = JSON.parse(response);
  		this.tracks = output['tracks']['items'];
  		console.log(this.tracks);

  	});
  }
  pause(){
  	let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.token);
  	//header not getting passed in? or params
  	let params = new HttpParams().set('device_id', this.deviceID);
  	this.http.put('https://api.spotify.com/v1/me/player/pause', {headers: headers, params: params}).subscribe((response) =>{
  		console.log(response);
  	});
  }
  loadSpotifyScript(){
  	const node = document.createElement('script');
  	node.src = 'https://sdk.scdn.co/spotify-player.js';
  	node.type = 'text/javascript';
  	document.getElementsByTagName('head')[0].appendChild(node);
  }

  initializeSpotifyPlayer(){
  	window.onSpotifyWebPlaybackSDKReady = () => {
  		const token = window.localStorage.getItem('auth_token');
  		//'BQCLqevB8AQB_XS3v4db1er8Dlm1A_1nFmLEZeNRUFq-pOnyEGZyuF-RDH0EhFDdLHzK9J9VLjQ94pealD9vb62l8GbzK_Rp0P3Arfsjx2Zs9U9UWOcPqkIHXEBa6NE-lkMnEPVxPisr85AR37ucQ0I2JZ-M-ptc6D8';
  		this.player = new Spotify.Player({
    		name: 'Web Playback SDK Quick Start Player',
    		getOAuthToken: cb => { cb(token) }
  });

  	// Error handling
  	this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
  	this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
  	this.player.addListener('account_error', ({ message }) => { console.error(message); });
  	this.player.addListener('playback_error', ({ message }) => { console.error(message); });

  	// Playback status updates
  	this.player.addListener('player_state_changed', state => { console.log(state); });

  	// Ready
  	this.player.addListener('ready', ({ device_id }) => {
  		this.deviceID = device_id;
    	console.log('Ready with Device ID', device_id);
  	});

  	// Not Ready
  	this.player.addListener('not_ready', ({ device_id }) => {
    	console.log('Device ID has gone offline', device_id);
  	});

  	// Connect to the player!
  	this.player.connect();
  	this.player.getCurrentState().then(state => {
  		if (!state) {
    		console.error('User is not playing music through the Web Playback SDK');
    	return;
  		}

  	let {
    	current_track,
    	next_tracks: [next_track]
  		} = state.track_window;

  	console.log('Currently Playing', current_track);
  	console.log('Playing Next', next_track);
	});
	};
  }



}
