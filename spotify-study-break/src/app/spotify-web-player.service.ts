import { Injectable } from '@angular/core';

declare global {
	interface window{
		onSpotifyWebPlaybackSDKReady: () => void;
		
	}
}

@Injectable({
  providedIn: 'root'
})

export class SpotifyWebPlayerService {
	/*private player: Spotify.SpotifyPlayer;
	addSpotifyPlaybackSdk(){
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.type = 'text/javascript';
		script.addEventListener('load', (e) =>{
			console.log(e);
		});
		document.head.appendChild(script);
		window.onSpotifyWebPlaybackSDKReady = () =>{
			console.log('Web Playback is ready');
			this.player = new Spotify.Player({
				name: 'Studybreak',
				volume: 0.3,
				getOAuthToken
			})
		}
	}*/
  constructor() { }
}
