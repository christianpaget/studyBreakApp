import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }
  constructor(private router: Router) { 
  	//this.loadSpotifyScript();
  	//this.initializeSpotifyPlayer();
  }

  spotifyID = 'a466c513c83a43809ffe7f0573d24418';
  spotifySecret = '0575752dbd7e41ac964f63c60342308e';

  loadSpotifyScript(){
  	const node = document.createElement('script');
  	node.src = 'https://sdk.scdn.co/spotify-player.js';
  	node.type = 'text/javascript';
  	document.getElementsByTagName('head')[0].appendChild(node);
  }

  initializeSpotifyPlayer(){
  	window.onSpotifyWebPlaybackSDKReady = () => {
  		const token = 'BQCLqevB8AQB_XS3v4db1er8Dlm1A_1nFmLEZeNRUFq-pOnyEGZyuF-RDH0EhFDdLHzK9J9VLjQ94pealD9vb62l8GbzK_Rp0P3Arfsjx2Zs9U9UWOcPqkIHXEBa6NE-lkMnEPVxPisr85AR37ucQ0I2JZ-M-ptc6D8';
  		const player = new Spotify.Player({
    		name: 'Web Playback SDK Quick Start Player',
    		getOAuthToken: cb => { cb(token) }
  });

  	// Error handling
  	player.addListener('initialization_error', ({ message }) => { console.error(message); });
  	player.addListener('authentication_error', ({ message }) => { console.error(message); });
  	player.addListener('account_error', ({ message }) => { console.error(message); });
  	player.addListener('playback_error', ({ message }) => { console.error(message); });

  	// Playback status updates
  	player.addListener('player_state_changed', state => { console.log(state); });

  	// Ready
  	player.addListener('ready', ({ device_id }) => {
    	console.log('Ready with Device ID', device_id);
  	});

  	// Not Ready
  	player.addListener('not_ready', ({ device_id }) => {
    	console.log('Device ID has gone offline', device_id);
  	});

  	// Connect to the player!
  	player.connect();
  	player.getCurrentState().then(state => {
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
