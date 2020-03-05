import { Component, OnInit } from '@angular/core';
import { Playlist } from './playlist'
@Component({
  selector: 'app-new-playlist-form',
  templateUrl: './new-playlist-form.component.html',
  styleUrls: ['./new-playlist-form.component.css']
})
export class NewPlaylistFormComponent implements OnInit {
    genres = ["Rock", "Pop", "Classical", "Acoustic"];
  	playlistModel = new Playlist("", "", "", "", 5, 15);
  	ngOnInit(): void {
  	}
  	/*
  	TODO: Make value in search bar clear when new option is chosen
  	*/
  	resetSelections(){
  		this.playlistModel = new Playlist("", "", "", "", 5, 15);
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
  		if(this.playlistModel.step2choice == "" || this.playlistModel.step2search == ""){
  			this.step2alert();
  			fail = false;
  		}
  		if(this.playlistModel.studytime == 0 || this.playlistModel.studytime == 0){
  			this.step3alert();
  			fail = false;
  		}
  		return fail

  	}


  	submitPlaylist(){
  		if(this.validatePlaylist()){
  			alert("Thank you for creating a playlist");
  		}
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

}
