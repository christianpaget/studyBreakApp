import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { newPlaylist } from '../new-playlist-form/newPlaylist';
import { timer } from 'rxjs';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit {
	ngOnInit(): void {
		if(!window.localStorage.getItem('user')){
			this.router.navigate(['/login']);
			return;
		}
  		else if(!window.localStorage.getItem('auth_token') || window.localStorage.getItem('auth_token')==undefined){
  			this.router.navigate(['/spotify-login']);
  		}
  		let info = this.route.snapshot.paramMap;
  		this.playlist.step1choice = info.get('step1choice');
  		this.playlist.step1search = info.get('step1search');
  		this.playlist.step2choice = info.get('step2choice');
  		this.playlist.step2search = info.get('step2search');
  		this.playlist.breaktime = parseInt(info.get('breaktime'))
  		this.playlist.studytime = parseInt(info.get('studytime'));
  		this.playlist.userID = info.get('userID');
  		this.playlist.playlistID = parseInt(info.get('playlistID'));
  		this.minuteTimeLeft = this.playlist.studytime;
  		this.studytime = true;
  		this.loadSpotifyScript();
  		this.initializeSpotifyPlayer();
  		this.searchSpotify();
  		this.pause();

  		//this.token = window.localStorage.getItem('auth_token');
  		//this.headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.token);
  }
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { 
  	//this.loadSpotifyScript();
  	//this.initializeSpotifyPlayer();
  }
  trackNum = 0;
  playing;
  seenTimer;
  interval;
  studytime;
  secondTimeLeft = 0;
  minuteTimeLeft;
  playlist = new newPlaylist('', '', '', '', null, null, null, '');
  token; //window.localStorage.getItem('auth_token');
  headers;//= new HttpHeaders().append('Authorization', 'Bearer ' + this.token)
  deviceID;
  player;
  spotifyID = 'a466c513c83a43809ffe7f0573d24418';
  spotifySecret = '0575752dbd7e41ac964f63c60342308e';
  tracks: [];
  switchVibe(){
  	this.studytime = !this.studytime;
  	this.searchSpotify();
  	this.queue();
  	console.log('queue');
  	this.nextTrack();
  	console.log('next');
  	
  }
  startSession(){
  	this.queue();
  	this.nextTrack();
  	this.play();
  	this.interval = setInterval(() =>{
  		if(this.secondTimeLeft > 0)
  			this.secondTimeLeft--;
  		else if(this.minuteTimeLeft > 0) {
  			this.secondTimeLeft = 59;
  			this.minuteTimeLeft --;
  		}
  		else{
  			if(this.studytime)
  				this.minuteTimeLeft = this.playlist.breaktime;
  			else
  				this.minuteTimeLeft = this.playlist.studytime;
  			//this.studytime = !this.studytime;
  			this.switchVibe();
  		}
  	}, 1000)
  }
  queue(){
  	let token = window.localStorage.getItem('auth_token');
	let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  	//console.log(headers);
  	let params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.trackNum]['uri']);
  	//console.log(this.tracks[0]['uri']);
  	let data = JSON.stringify(params);
  	//console.log(data);
  	this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.trackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  		console.log(response);
  	});
  	this.trackNum ++;
  }
  nextTrack(){
  	let token = window.localStorage.getItem('auth_token');
	let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  	//console.log(headers);
  	//let params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.trackNum]['uri']);
  	//console.log(this.tracks[0]['uri']);
  	//let data = JSON.stringify(params);
  	//console.log(data);
  	this.http.post('https://api.spotify.com/v1/me/player/next', '', {headers: headers}).subscribe((response) =>{
  		console.log(response);
  	});
  }
  searchSpotify(){

  	let token = window.localStorage.getItem('auth_token');

  	let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
  	//headers = headers.append('Authorization', 'Bearer ' + token);
  	//let q = 'artist:';
  	let q;
  	if(this.studytime)
  		q = this.playlist.step1choice + ':' + this.playlist.step1search;
  	else
  		q = this.playlist.step2choice + ':' + this.playlist.step2search;

  	let type = 'track';
  	//console.log(headers);
  	let params = new HttpParams().set('q', q).set('type', type);
  	this.http.get('https://api.spotify.com/v1/search', {headers: headers, params: params, responseType: 'text' as 'json'}).subscribe((response) =>{

  		//console.log(response);
  		let output = JSON.parse(response);
  		this.tracks = output['tracks']['items'];

  		console.log(this.tracks);

  	});
  }
  play(){
  	this.playing = true;
  	let token = window.localStorage.getItem('auth_token');
	let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  	//console.log(headers);
  	let params = new HttpParams().set('device_id', this.deviceID).set('context_uri', this.tracks[0]['uri']);
  	console.log(params);
  	let data = JSON.stringify(params);
  	console.log(data);

  	this.http.put('https://api.spotify.com/v1/me/player/play', data, {headers: headers}).subscribe((response) =>{
  		console.log(response);
  	});

  }
  pause(){
  	this.playing = false;
  	let token = window.localStorage.getItem('auth_token');
	let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  	let params = new HttpParams().set('device_id', this.deviceID);
  	this.http.put('https://api.spotify.com/v1/me/player/pause', params, {headers: headers}).subscribe((response) =>{
  		console.log(response);

  	});  	


  	/*let headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.token);
  	//header not getting passed in? or params
  	let params = new HttpParams().set('device_id', this.deviceID);
  	console.log(this.token);
  	this.http.put('https://api.spotify.com/v1/me/player/pause', {headers: headers}).subscribe((response) =>{
  		console.log(response);
  	});
  	*/
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
  	this.player.addListener('authentication_error', ({ message }) => { 
  		console.error(message);
  		window.localStorage.removeItem('auth_token'); 
  		this.router.navigate(['/spotify-login']);
  			});
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
