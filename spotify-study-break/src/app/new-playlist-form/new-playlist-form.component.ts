import { Component, OnInit } from '@angular/core';
import { Playlist } from './playlist'
@Component({
  selector: 'app-new-playlist-form',
  templateUrl: './new-playlist-form.component.html',
  styleUrls: ['./new-playlist-form.component.css']
})
export class NewPlaylistFormComponent implements OnInit {
    genres = ["Rock", "Pop", "Classical", "Acoustic"];
  	playlistModel = new Playlist("", "", "", "", 0, 0);
  	ngOnInit(): void {
  	}
  /*showGenreOne(){
		var check = document.getElementById("step1genre");
		var box = document.getElementById("step1boxgenre");
		box.style.display = check.checked ? "block" : "none";
	}*/

}
