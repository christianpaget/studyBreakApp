import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { newPlaylist } from '../new-playlist-form/newPlaylist';
import { timer } from 'rxjs';
import { KlaviyoService } from '../klaviyo.service';
import { PlaylistServiceService } from '../playlist-service.service'

declare var Spotify: any;
declare var window: any;
@Component({
	selector: 'app-spotify-player',
	templateUrl: './spotify-player.component.html',
	styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit, OnDestroy {
	ngOnInit(): void {
		if (!window.localStorage.getItem('user')) {
			this.router.navigate(['/login']);
			return;
		}
		console.log(this.playlistService.listenPlaylist)
		if (!window.localStorage.getItem('auth_token') || window.localStorage.getItem('auth_token') == undefined) {
			this.router.navigate(['/spotify-login']);
		}

		this.playlist = this.playlistService.listenPlaylist;
		this.klaviyoService.sendPlayerAccessToKlaviyo(this.playlist)
		console.log(this.playlist);
		let info = this.route.snapshot.paramMap;
		console.log(info.get('title'));
		if(info.get('title')!=null){ // Redirect from Klaviyo, params are in url
			console.log("Redirect from Klaviyo")
			this.playlist.title = info.get('title');
			this.playlist.focusPlaylist = info.get('focusPlaylist');
			this.playlist.relaxPlaylist = info.get('relaxPlaylist');
			this.playlist.focusTime = parseInt(info.get('focusTime'));
			this.playlist.relaxShortTime = parseInt(info.get('relaxShortTime'))
			this.playlist.relaxLongTime = parseInt(info.get('relaxLongTime'));
			this.playlist.userID = info.get('userID');
			this.playlist.roundsNumber = parseInt(info.get('roundsNumber'))
			this.playlist.playlistID = parseInt(info.get('playlistID'));
		}
		
		
		
		this.minuteTimeLeft = this.playlist.focusTime;
		this.studytime = true;
		this.loadSpotifyScript();
		this.initializeSpotifyPlayer();
		this.searchSpotify();
		this.pause();

	}
	ngOnDestroy() {
		try {
			this.player.pause();
		}
		catch (e) {
			console.log(e);

		} finally {
			clearInterval(this.interval);
			console.log('Interval cleared: ' + this.interval);
		}
	}
	constructor(public klaviyoService: KlaviyoService, public playlistService: PlaylistServiceService, private router: Router, private http: HttpClient, private route: ActivatedRoute) {
	}
	changed = true;
	currentSong;
	studyTrackNum = 0;
	breakTrackNum = 0;
	playing;
	sessionRunning = false;
	isBeginning = false;
	seenTimer;
	interval;
	currentSongTime;
	studytime;
	secondTimeLeft = 0;
	minuteTimeLeft;
	playlist = new newPlaylist("", "", "", 25, 5, 20, 4, null, "", "", "");
	token; //window.localStorage.getItem('auth_token');
	headers;//= new HttpHeaders().append('Authorization', 'Bearer ' + this.token)
	deviceID;
	player;
	spotifyID = 'a466c513c83a43809ffe7f0573d24418';
	tracks: [];
	switchVibe() {
		this.studytime = !this.studytime;
		let token = window.localStorage.getItem('auth_token');
		let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
		let q;
		/*
		  if(this.studytime)
			  q = this.playlist.focusPlaylist + ':' + this.playlist.step1search;
		  else
			  q = this.playlist.relaxPlaylist + ':' + this.playlist.step2search;
  */
		let type = 'track';
		let params = new HttpParams().set('q', q).set('type', type);
		this.http.get('https://api.spotify.com/v1/search', { headers: headers, params: params, responseType: 'text' as 'json' }).subscribe((response) => {

			//console.log(response);
			try {
				let output = JSON.parse(response.toString());
				this.tracks = output['tracks']['items'];

				console.log(this.tracks);
			}
			catch (e) {

			}
			if (this.studytime) {
				let data = this.tracks[this.studyTrackNum]['name'];
				this.http.post('https://api.spotify.com/v1/me/player/queue?uri=' + this.tracks[this.studyTrackNum]['uri'], '', { headers: headers }).subscribe((response) => {
					console.log("Queued: " + data + "in switchVibe");
					this.studyTrackNum++;
					this.nextTrack();
				});
			}
			else {
				let data = this.tracks[this.studyTrackNum]['name'];
				this.http.post('https://api.spotify.com/v1/me/player/queue?uri=' + this.tracks[this.breakTrackNum]['uri'], '', { headers: headers }).subscribe((response) => {
					console.log("Queued: " + data + "in switchVibe");
					this.breakTrackNum++;
					this.nextTrack();
				});

			}
		});
		//this.queue();
	}
	async startSessionHelper() {
		let token = window.localStorage.getItem('auth_token');
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
		let params;
		if (this.studytime) {
			params = this.tracks[this.studyTrackNum]['name'];
			await this.http.post('https://api.spotify.com/v1/me/player/queue?uri=' + this.tracks[this.studyTrackNum]['uri'], '', { headers: headers })//.subscribe((response) =>{
			setTimeout(() => 500);
			console.log("Queued: " + params + " in startSessionHelper");
			this.http.post('https://api.spotify.com/v1/me/player/next', '', { headers: headers }).subscribe((response) => {
				console.log("Next clicked");
				this.player.resume();
				this.playing = true;
				//});
			});
			this.studyTrackNum++;
			console.log("studyTrackNum");
		}
		else {
			params = this.tracks[this.studyTrackNum]['name'];
			this.http.post('https://api.spotify.com/v1/me/player/queue?uri=' + this.tracks[this.breakTrackNum]['uri'], '', { headers: headers }).subscribe((response) => {
				console.log("Queued: " + params + " in startSessionHelper");
			});
			this.breakTrackNum++;
		}
	}
	async startSession() {
		//this.queue();
		//this.nextTrack();
		//this.play();
		this.sessionRunning = true;
		await this.startSessionHelper();
		console.log('secondTimeLeft');

		this.interval = setInterval(() => {

			if (this.secondTimeLeft > 0)
				this.secondTimeLeft--;
			else if (this.minuteTimeLeft > 0) {
				this.secondTimeLeft = 59;
				this.minuteTimeLeft--;
			}
			else {
				if (this.studytime)
					this.minuteTimeLeft = this.playlist.focusTime;
				else
					this.minuteTimeLeft = this.playlist.relaxShortTime;
				//this.studytime = !this.studytime;
				this.switchVibe();
			}
		}, 1000)
	}


	async queue() {
		let token = window.localStorage.getItem('auth_token');
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
		//console.log(headers);
		let params;
		if (this.studytime) {
			params = this.tracks[this.studyTrackNum]['name'];
			//params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.studyTrackNum]['uri']);
			await this.http.post('https://api.spotify.com/v1/me/player/queue?uri=' + this.tracks[this.studyTrackNum]['uri'], '', { headers: headers }).subscribe((response) => {
				console.log("Queued: " + params + "in queue function");
			});
			this.studyTrackNum++;
		}
		else {
			params = this.tracks[this.studyTrackNum]['name'];
			this.http.post('https://api.spotify.com/v1/me/player/queue?uri=' + this.tracks[this.breakTrackNum]['uri'], '', { headers: headers }).subscribe((response) => {
				console.log("Queued: " + params + "in queue function");
			});
			this.breakTrackNum++;
		}
		//params = new HttpParams().set('device_id', this.deviceID).set('uri', this.tracks[this.breakTrackNum]['uri']);
		//console.log(this.tracks[0]['uri']);
		//let data = JSON.stringify(params);
		//console.log(data);
		//this.http.post('https://api.spotify.com/v1/me/player/queue?uri='+ this.tracks[this.trackNum]['uri'], '', {headers: headers}).subscribe((response) =>{
		//	console.log(response);
		//});
	}
	nextTrack() {
		let token = window.localStorage.getItem('auth_token');
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
		this.http.post('https://api.spotify.com/v1/me/player/next', '', { headers: headers }).subscribe((response) => {
			console.log(response);
		});
	}
	searchSpotify() {

		let token = window.localStorage.getItem('auth_token');

		let headers = new HttpHeaders().append('Authorization', 'Bearer ' + token);
		//headers = headers.append('Authorization', 'Bearer ' + token);
		//let q = 'artist:';
		let q;
		/*
	  if(this.studytime)
			q = this.playlist.focusPlaylist + ':' + this.playlist.step1search;
		else
			q = this.playlist.relaxPlaylist + ':' + this.playlist.step2search;
*/
		let type = 'track';
		//console.log(headers);
		let params = new HttpParams().set('q', q).set('type', type);
		this.http.get('https://api.spotify.com/v1/search', { headers: headers, params: params, responseType: 'text' as 'json' }).subscribe((response) => {

			//console.log(response);

			let output = JSON.parse(response.toString());
			this.tracks = output['tracks']['items'];

			console.log(this.tracks);

		});
	}
	play() {
		this.playing = true;
		let token = window.localStorage.getItem('auth_token');
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
		//console.log(headers);
		let params = new HttpParams().set('device_id', this.deviceID).set('context_uri', this.currentSong);
		console.log(params);
		let data = JSON.stringify(params);
		console.log(data);

		this.http.put('https://api.spotify.com/v1/me/player/play', data, { headers: headers }).subscribe((response) => {
			console.log(response);
		});

	}
	pause() {
		this.playing = false;
		let token = window.localStorage.getItem('auth_token');
		let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
		let params = new HttpParams().set('device_id', this.deviceID);
		this.http.put('https://api.spotify.com/v1/me/player/pause', params, { headers: headers }).subscribe((response) => {
			console.log(response);

		});

	}
	loadSpotifyScript() {
		const node = document.createElement('script');
		node.src = 'https://sdk.scdn.co/spotify-player.js';
		node.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(node);
	}

	initializeSpotifyPlayer() {
		try {
			window.onSpotifyWebPlaybackSDKReady = () => {
				const token = window.localStorage.getItem('auth_token');
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
					//console.log("Changed: " + state['track_window']['current_track']['name']);
					let track = state['track_window']['current_track']['uri'];
					//console.log(track);
					if (this.sessionRunning) {
						//console.log("sessionRunning")
						if (track != this.currentSong) {
							if (this.currentSongTime == state['duration']) {
								console.log("Not up to date");
								return;
							}
							console.log(state['duration']);
							this.changed = false;
							this.currentSong = track;
							this.currentSongTime = state['duration'];
							console.log('New Song');

						}
						//this.changed = false;
						//let json = JSON.parse(state);
						if (!this.changed) {
							//console.log(state['position']);
							let length = state['duration'] - state['position'];
							let sessionLength = ((this.minuteTimeLeft * 60) + this.secondTimeLeft) * 1000;
							console.log('Song length: ' + length);
							console.log('Session Length:' + sessionLength);
							if (sessionLength > length) {
								this.queue();
								console.log('queued');

							}
							this.changed = true;
						}
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

					this.http.put('https://api.spotify.com/v1/me/player', json, { headers: headers }).subscribe((response) => {
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
		catch (e) {
			console.log(e);
			alert("Error occured while loading spotify player, returning to My Playlists");
			this.router.navigate(['/user-home']);
		}
	}



}
