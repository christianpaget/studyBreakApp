import { Component, OnInit } from '@angular/core';
import { newPlaylist } from './newPlaylist'
import { ApiService } from '../api.service';
import { Playlist } from '../playlist';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-playlist-form',
  templateUrl: './new-playlist-form.component.html',
  styleUrls: ['./new-playlist-form.component.css']
})
export class NewPlaylistFormComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer){}
    user = "";
	id;
    genres = ["Rock", "Pop", "Classical", "Acoustic"];
  	playlistModel = new newPlaylist("", "", "", 25, 5 , 20, 4,null, this.user);
  	//playlists: newPlaylist[];
	playlists;
    responseData;
	authToken;
	spotId;
	spotUserPic
    //window.localStorage.getItem('user');
  	ngOnInit() {
		// Grab auth_token from Spotify Redirect
		if(!window.localStorage.getItem('auth_token') || window.localStorage.getItem('auth_token')==undefined){
		//this.activatedRoute.queryParams.subscribe(params => {
			let params = this.activatedRoute.snapshot.fragment;
			if ( params != undefined) {
				let token = params.split('&')[0];
				let arg = token.split('=');
				console.log(arg[1]);
				if(arg[1])
					window.localStorage.setItem('auth_token', arg[1]);
					this.authToken = arg[1];
			}
		}
		//Get playlists of logged in user
		let token = window.localStorage.getItem('auth_token');
		const headers = {
			headers: new HttpHeaders({
				'Content-Type':'application/json',
				'Authorization': `Bearer ${token}`
			})
		};
		console.log(headers);
		this.http.get("https://api.spotify.com/v1/me", headers).subscribe((userMetaData)=>{
			userMetaData = (userMetaData);
			this.spotUserPic = (JSON.stringify(userMetaData['images'][0]['url']));
			this.user = userMetaData['display_name'];
			this.spotId = userMetaData['id'];
			window.localStorage.setItem('user', this.user);
			window.localStorage.setItem('id', this.spotId);
			window.localStorage.setItem('spotifyPic', this.spotUserPic);
		});
		
		
		this.user = window.localStorage.getItem('user')
		let userSpotID = window.localStorage.getItem('id');
		this.spotUserPic = this.domSanitizer.bypassSecurityTrustResourceUrl(window.localStorage.getItem('spotifyPic'));
		console.log(this.spotUserPic)
		console.log(this.user)
		console.log(this.spotId)
		const playlistHeaders = {
			headers: new HttpHeaders({
				'Content-Type':'application/json',
				'userID': userSpotID
			})
		};
		let tempSpotId = this.spotId;
		this.http.get("https://api.spotify.com/v1/users/" + window.localStorage.getItem("id") + "/playlists", headers).subscribe((userPlaylists)=>{
			console.log(userPlaylists)
			let playlistsArray = []
			for(let item in userPlaylists['items']){
				console.log(item)
				playlistsArray.push(userPlaylists['items'][item]['name'])
			}
			this.playlists = playlistsArray
			console.log(this.playlists)
		})
		/*if(!window.localStorage.getItem('user')){
			alert('You must sign in before you can access this page');
			this.router.navigate(['/login']);
		}*/
		this.user = window.localStorage.getItem('user');
		this.id = window.localStorage.getItem('id');
		var param = { session : "yes"};
		this.playlistModel.userID = this.id;
  	}

    redirectSuccess(){
      this.router.navigate(['/homepage'])
    }
	/*
  	submitPlaylist(form: any): void{
      if(this.validatePlaylist()){
        let params = this.playlistModel;
		var apiUrl = environment.apiUrl;
        this.http.post<any>(apiUrl + '/new/playlist', params).subscribe((data) =>{
          console.log('Response: ', data);
		  if(data['status'] == 200){
			  console.log("here")
			this.redirectSuccess()
		  }
        }, (error) =>{
          if(error.status==400){
            alert("Received 400 error")
          }
          //this.redirectSuccess();

          console.log('Error: ', error);
        });
      }
    }
	/*
    resetSelections(){
  		this.playlistModel = new newPlaylist("", "", "", "", 30, 15, null, this.user);
      document.getElementById("step1alert").innerHTML = "";
      document.getElementById("step2alert").innerHTML = "";
      document.getElementById("step3alert").innerHTML = "";
      this.resetSearch();


  	}
    /*resetSearch(){
    document.getElementById("step1boxgenre").style.display = "none";
    document.getElementById("step1boxartist").style.display = "none";
    document.getElementById("step1boxplaylist").style.display = "none";
    document.getElementById("step2boxgenre").style.display = "none";
    document.getElementById("step2boxartist").style.display = "none";
    document.getElementById("step2boxplaylist").style.display = "none";
        

    }
  	step1alert(){
  		document.getElementById("step1alert").innerHTML = "Please select an option and enter a search term";
  	}
  	step2alert(){
  		document.getElementById("step2alert").innerHTML = "Please select an option and enter a search term";
  	}
  	step3alert(){
  		document.getElementById("step3alert").innerHTML = "Please select a time period greater than 0";
  	}
  	validatePlaylist(){
  		var fail = true
  		if(this.playlistModel.step1choice == "" || this.playlistModel.step1search == ""){
  			this.step1alert();
  			fail = false;

  		}
      else{
        document.getElementById("step1alert").innerHTML = "";

      }
  		if(this.playlistModel.step2choice == "" || this.playlistModel.step2search == ""){
  			this.step2alert();
  			fail = false;
  		}
      else{
        document.getElementById("step2alert").innerHTML = "";

      }
  		if(this.playlistModel.studytime <= 0 || this.playlistModel.studytime <= 0){
  			this.step3alert();
  			fail = false;
  		}
      else{
        document.getElementById("step3alert").innerHTML = "";

      }
  		return fail;

  	}


  	
  	showGenreOne(){
		var box = document.getElementById("step1boxgenre");
		box.style.display = "inline-block";
		var artistbox = document.getElementById("step1boxartist")
		var playlistbox = document.getElementById("step1boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "none";

		console.log(box);
	}
	showArtistOne(){
		var genrebox = document.getElementById("step1boxgenre");
		var artistbox = document.getElementById("step1boxartist")
		var playlistbox = document.getElementById("step1boxplaylist");
		artistbox.style.display = "inline-block";
		playlistbox.style.display = "none";
		genrebox.style.display = "none";

	}

	showPlaylistOne(){
		var genrebox = document.getElementById("step1boxgenre");
		var artistbox = document.getElementById("step1boxartist")
		var playlistbox = document.getElementById("step1boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "inline-block";
		genrebox.style.display = "none";
	}

	showGenreTwo(){
		var box = document.getElementById("step2boxgenre");
		box.style.display = "inline-block";
		var artistbox = document.getElementById("step2boxartist")
		var playlistbox = document.getElementById("step2boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "none";

		console.log(box);
	}
	showArtistTwo(){
		var genrebox = document.getElementById("step2boxgenre");
		var artistbox = document.getElementById("step2boxartist")
		var playlistbox = document.getElementById("step2boxplaylist");
		artistbox.style.display = "inline-block";
		playlistbox.style.display = "none";
		genrebox.style.display = "none";

	}

	showPlaylistTwo(){
		var genrebox = document.getElementById("step2boxgenre");
		var artistbox = document.getElementById("step2boxartist")
		var playlistbox = document.getElementById("step2boxplaylist");
		artistbox.style.display = "none";
		playlistbox.style.display = "inline-block";
		genrebox.style.display = "none";
	}
*/
}
