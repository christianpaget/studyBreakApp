import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { newPlaylist } from '../new-playlist-form/newPlaylist';
import { timer } from 'rxjs';
declare var Spotify:any;
declare var window:any;
@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit, OnDestroy {
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
  ngOnDestroy(){
  	try{
  		this.player.pause();
  }
  catch(e){
  	console.log(e);

  }	finally{
  	clearInterval(this.interval);
  	console.log('Interval cleared: ' + this.interval);
  }
  }
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { 
  	//this.loadSpotifyScript();
  	//this.initializeSpotifyPlayer();
  }
  changed = false;
  currentSong;
  studyTrackNum = 0;
  breakTrackNum = 0;
  playing;
  isBeginning = false;
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
  	//this.searchSpotify();
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
  		try{
  			let output = JSON.parse(response.toString());
  			this.tracks = output['tracks']['items'];

  			console.log(this.tracks);
  		}
  		catch(e){

  		}
  		//let token = window.localStorage.getItem('auth_token');
		//let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  		//console.log(headers);
  		//let params;
  		if(this.studytime){
  		//params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.studyTrackNum]['uri']);
  			this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.studyTrackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  				console.log(response);
	  			this.studyTrackNum ++;
	  			this.nextTrack();
  			});
  		}
  		else{
  			this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.breakTrackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  				console.log(response);
  				this.breakTrackNum ++;
  				this.nextTrack();
  			});
  			
  		}
  	});
  	//this.queue();


/*
  	console.log('queue');
  	this.nextTrack();
  	console.log('next');
  */	
  }
  startSessionHelper(){
  	let token = window.localStorage.getItem('auth_token');
	let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  	//console.log(headers);
  	let params;
  	if(this.studytime){
  		//params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.studyTrackNum]['uri']);
  		this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.studyTrackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  			console.log(response);
  			//let token = window.localStorage.getItem('auth_token');
			//let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
		  	this.http.post('https://api.spotify.com/v1/me/player/next', '', {headers: headers}).subscribe((response) =>{
  				console.log(response);
  				this.player.resume();
  	});
  		});
  		this.studyTrackNum ++;
  	}
  	else{
  		this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.breakTrackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  		console.log(response);
  	});
  		this.breakTrackNum ++;
  	}
  }
  startSession(){
  	//this.queue();
  	//this.nextTrack();
  	//this.play();
  	this.startSessionHelper();
  	console.log('secondTimeLeft');
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
  	let params;
  	if(this.studytime){
  		//params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.studyTrackNum]['uri']);
  		this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.studyTrackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  			console.log(response);
  		});
  		this.studyTrackNum ++;
  	}
  	else{
  		this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.breakTrackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  		console.log(response);
  	});
  		this.breakTrackNum ++;
  	}
  		//params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.breakTrackNum]['uri']);
  	//console.log(this.tracks[0]['uri']);
  	//let data = JSON.stringify(params);
  	//console.log(data);
  	//this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.trackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
  	//	console.log(response);
  	//});
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

  		let output = JSON.parse(response.toString());
  		this.tracks = output['tracks']['items'];

  		console.log(this.tracks);

  	});
  }
  play(){
  	this.playing = true;
  	let token = window.localStorage.getItem('auth_token');
	let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  	//console.log(headers);
  	let params = new HttpParams().set('device_id', this.deviceID).set('context_uri', this.currentSong);
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
  	try{
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
  	this.player.addListener('player_state_changed', state => { 
  		console.log(state);
  		let track = state['context']['uri'];
  		//this.currentSong = state['context']['uri'];
  		if(track != this.currentSong){
  			this.changed = false;
  			this.currentSong = track;
  			console.log('New Song');
  		}
  		//this.changed = false;
  		//let json = JSON.parse(state);
  		if(!this.changed){
  			//console.log(state['position']);
  			let length = state['duration'] - state['position'];
  			let sessionLength = ((this.minuteTimeLeft * 60) + this.secondTimeLeft) * 1000;
  			console.log('Song length: ' + length);
  			console.log('Session Length:' + sessionLength);
  			if(sessionLength > length){
  				this.queue();
  				console.log('queued');

  			}
  			this.changed = true;
  		}
  	});

  	// Ready
  	this.player.addListener('ready', ({ device_id }) => {
  		this.deviceID = device_id;
    	console.log('Ready with Device ID', device_id);
    	let token = window.localStorage.getItem('auth_token');
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  		let params = new HttpParams().set('device_ids', this.deviceID);
  		let json = "{\"device_ids\": [\"" + this.deviceID + "\"]}";
  		let data = JSON.stringify(params);

  		this.http.put('https://api.spotify.com/v1/me/player', json, {headers: headers}).subscribe((response) =>{
  			console.log(response);

  		});
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
catch(e){
	console.log(e);
	alert("Error occured while loading spotify player, returning to My Playlists");
	this.router.navigate(['/user-home']);
}
}



}
