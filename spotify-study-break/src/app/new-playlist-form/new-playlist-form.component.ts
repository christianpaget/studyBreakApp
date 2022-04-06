import { Component, OnInit } from '@angular/core';
import { newPlaylist } from './newPlaylist'
import { ApiService } from '../api.service';
import { Playlist } from '../playlist';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { KlaviyoService } from '../klaviyo.service';
import { PlaylistServiceService } from '../playlist-service.service';

@Component({
	selector: 'app-new-playlist-form',
	templateUrl: './new-playlist-form.component.html',
	styleUrls: ['./new-playlist-form.component.css']
})
export class NewPlaylistFormComponent implements OnInit {
	constructor(public klaviyoService: KlaviyoService, public apiService: ApiService, public playlistServce: PlaylistServiceService, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer) { }
	user = "";
	id;
	genres = ["Rock", "Pop", "Classical", "Acoustic"];
	playlistModel = new newPlaylist("", "", "", 25, 5, 20, 4, null, "", "", this.user);
	//playlists: newPlaylist[];
	playlists;
	playlistIds
	responseData;
	userEmail;
	authToken;
	spotId;
	spotUserPic
	ngOnInit() {
		// Grab auth_token from Spotify Redirect
		let params = this.activatedRoute.snapshot.fragment;
		if (params != undefined) {
			let token = params.split('&')[0];
			let arg = token.split('=');
			console.log(arg[1]);
		if (!window.localStorage.getItem('auth_token') || window.localStorage.getItem('auth_token') == undefined || window.localStorage.getItem('auth_token') != arg[1]) {
			if (arg[1])
					window.localStorage.setItem('auth_token', arg[1]);
				this.authToken = arg[1];
			}
		}
		// Set headers to call Spotify API using token grabbed above
		let token = window.localStorage.getItem('auth_token');
		const headers = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};
		console.log(headers);
		let userMetaData;
		// Get user data from API and set local storage
		this.http.get("https://api.spotify.com/v1/me", headers).subscribe((userMetaData) => {
			userMetaData = (userMetaData);
			console.log(userMetaData)
			this.spotUserPic = (JSON.stringify(userMetaData['images'][0]['url']));
			this.user = userMetaData['display_name'];
			this.spotId = userMetaData['id'];
			this.userEmail = userMetaData['email'];
			window.localStorage.setItem('email', this.userEmail);
			window.localStorage.setItem('user', this.user);
			window.localStorage.setItem('id', this.spotId);
			window.localStorage.setItem('spotifyPic', this.spotUserPic);
			if(userMetaData["error"]["error"]["message"] == 'The access token expired'){
				this.router.navigate(["/user-home"])
			}
		});
		// 
		this.user = window.localStorage.getItem('user')
		let userSpotID = window.localStorage.getItem('id');
		this.spotUserPic = this.domSanitizer.bypassSecurityTrustResourceUrl(window.localStorage.getItem('spotifyPic'));
		console.log(this.spotUserPic)
		console.log(this.user)
		console.log(this.spotId)
		// Set headers for playlists API call
		const playlistHeaders = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'userID': userSpotID
			})
		};
		// Get users playlists from Spotify to be used in playlist form. Populate playlistIds map with playlist name and playlist IDs
		let tempSpotId = this.spotId;
		this.http.get("https://api.spotify.com/v1/users/" + userSpotID + "/playlists", headers).subscribe((userPlaylists) => {
			console.log(userPlaylists)
			let playlistIds = {}
			let playlistsArray = []
			for (let item in userPlaylists['items']) {
				let playlist = userPlaylists["items"][item]
				playlistsArray.push(playlist["name"])
				playlistIds[playlist["name"]] = playlist["id"]
			}
			this.playlists = playlistsArray
			this.playlistIds = playlistIds
		})
		/*if(!window.localStorage.getItem('user')){
			alert('You must sign in before you can access this page');
			this.router.navigate(['/login']);
		}*/
		this.user = window.localStorage.getItem('user');
		this.id = window.localStorage.getItem('id');
		//var param = { session: "yes" };
		this.playlistModel.userID = this.id;
		// Calls Tracking API in Klaviyo Service
		this.klaviyoService.sendPlaylistScreenTrackingToKlaviyo()
	}


	redirectSuccess() {
		this.router.navigate(['/spotify-player'])
	}

	submitPlaylist(form: any): void {
		if (this.validatePlaylist()) {
			let params = this.playlistModel;
			this.playlistModel.relaxPlaylistID = this.playlistIds[this.playlistModel.relaxPlaylist];
			this.playlistModel.focusPlaylistID = this.playlistIds[this.playlistModel.focusPlaylist];
			var apiUrl = environment.apiUrl;
			console.log(this.playlistModel.focusPlaylistID)
			this.playlistServce.listenPlaylist = this.playlistModel;
			console.log(this.playlistServce.listenPlaylist)
			this.router.navigate(["/spotify-player"]);
			/*
			this.http.post<any>(apiUrl + '/new/playlist', params).subscribe((data) => {
				console.log('Response: ', data);
				if (data['status'] == 200) {
					console.log("here")
					this.redirectSuccess()
				}
			}, (error) => {
				if (error.status == 400) {
					alert("Received 400 error")
				}
				//this.redirectSuccess();

				console.log('Error: ', error);
			});*/
			
		}
	}
/*
	resetSelections() {
		this.playlistModel = new newPlaylist("", "", "", "", 30, 15, null, this.user);
		document.getElementById("step1alert").innerHTML = "";
		document.getElementById("step2alert").innerHTML = "";
		document.getElementById("step3alert").innerHTML = "";
		this.resetSearch();


	}
	resetSearch() {
		document.getElementById("step1boxgenre").style.display = "none";
		document.getElementById("step1boxartist").style.display = "none";
		document.getElementById("step1boxplaylist").style.display = "none";
		document.getElementById("step2boxgenre").style.display = "none";
		document.getElementById("step2boxartist").style.display = "none";
		document.getElementById("step2boxplaylist").style.display = "none";
	}
*/
	step1alert() {
		document.getElementById("step1alert").innerHTML = "Please select an option and enter a search term";
	}
	step2alert() {
		document.getElementById("step2alert").innerHTML = "Please select an option and enter a search term";
	}
	step3alert() {
		document.getElementById("step3alert").innerHTML = "Please select a time period greater than 0";
	}
	validatePlaylist() {
		console.log(this.playlistModel)
		var fail = true
		if (this.playlistModel.title == "") {
			fail = false;

		}
		
		if (this.playlistModel.focusPlaylist == "") {
			fail = false;
		}
		
		if (this.playlistModel.relaxPlaylist == "") {
			fail = false;
		}
		
		if (this.playlistModel.focusTime <= 0) {
			fail = false;
		}
		
		if (this.playlistModel.relaxShortTime <= 0) {
			fail = false;
		}
		
		if (this.playlistModel.relaxLongTime <= 0) {
			fail = false;
		}
		
		if (this.playlistModel.roundsNumber <= 0) {
			fail = false;
		}
		console.log(fail);
		return fail;

	}



	showGenreOne() {
		var box = document.getElementById("step1boxgenre");
		box.style.display = "inline-block";
		var artistbox = document.getElementById("step1boxartist")
		var playlistbox = document.getElementById("step1boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "none";

		console.log(box);
	}
	showArtistOne() {
		var genrebox = document.getElementById("step1boxgenre");
		var artistbox = document.getElementById("step1boxartist")
		var playlistbox = document.getElementById("step1boxplaylist");
		artistbox.style.display = "inline-block";
		playlistbox.style.display = "none";
		genrebox.style.display = "none";

	}

	showPlaylistOne() {
		var genrebox = document.getElementById("step1boxgenre");
		var artistbox = document.getElementById("step1boxartist")
		var playlistbox = document.getElementById("step1boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "inline-block";
		genrebox.style.display = "none";
	}

	showGenreTwo() {
		var box = document.getElementById("step2boxgenre");
		box.style.display = "inline-block";
		var artistbox = document.getElementById("step2boxartist")
		var playlistbox = document.getElementById("step2boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "none";

		console.log(box);
	}
	showArtistTwo() {
		var genrebox = document.getElementById("step2boxgenre");
		var artistbox = document.getElementById("step2boxartist")
		var playlistbox = document.getElementById("step2boxplaylist");
		artistbox.style.display = "inline-block";
		playlistbox.style.display = "none";
		genrebox.style.display = "none";

	}

	showPlaylistTwo() {
		var genrebox = document.getElementById("step2boxgenre");
		var artistbox = document.getElementById("step2boxartist")
		var playlistbox = document.getElementById("step2boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "inline-block";
		genrebox.style.display = "none";
	}
	
}
