import { Component, OnInit } from '@angular/core';
import { newPlaylist } from './newPlaylist'
import { ApiService } from '../api.service';
import { Playlist } from '../playlist';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-playlist-form',
  templateUrl: './new-playlist-form.component.html',
  styleUrls: ['./new-playlist-form.component.css']
})
export class NewPlaylistFormComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router){}
    genres = ["Rock", "Pop", "Classical", "Acoustic"];
  	playlistModel = new newPlaylist("", "", "", "", 5, 15 ,50);
  	playlists: newPlaylist[];
  	ngOnInit() {
  		/*this.apiService.readPlaylists().subscribe((playlists: newPlaylist[])=>{
  			this.playlists = playlists;
  			console.log(this.playlists);
  		})*/
  	}
  	/*
  	TODO: Make value in search bar clear when new option is chosen
    onSubmit(form: any): void{
    console.log('You submitted value: ', form);
    this.data_submitted = form;

    let params = JSON.stringify(form);
    //this.http.get<Order>('http://localhost/php-inclass/inclass11/ngphp-get.php?str='+params).subscribe((data) =>{
    this.http.post<Order>('http://localhost/php-inclass/inclass1/ngphp-get.php', params).subscribe((data) =>{
      console.log('Response: ', data);
      this.responseData = data;
    }, (error) =>{
      console.log('Error :', error);
    });
  }
  	*/
    redirectSuccess(){
      this.router.navigate(['/createSuccess'])
    }
  	submitPlaylist(form: any): void{
      if(this.validatePlaylist()){
        let params = JSON.stringify(this.playlistModel);
        console.log(params);
        this.http.post<newPlaylist>('http://localhost/api/createPlaylist.php', params).subscribe((data) =>{
          console.log('Response: ', data);
        }, (error) =>{
          if(error==201){
            //this.redirectSuccess();
          }
          this.redirectSuccess();

          console.log('Error: ', error);
        });
      }
    }
    resetSelections(){
  		this.playlistModel = new newPlaylist("", "", "", "", 5, 15, 0);
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
