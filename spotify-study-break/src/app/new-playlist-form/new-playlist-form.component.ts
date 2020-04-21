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
    user;
    genres = ["Rock", "Pop", "Classical", "Acoustic"];
  	playlistModel = new newPlaylist("", "", "", "", 30, 15 ,null, this.user);
  	playlists: newPlaylist[];
    responseData;
    //window.localStorage.getItem('user');
  	ngOnInit() {
      if(!window.localStorage.getItem('user')){
        alert('You must sign in before you can access this page');
        this.router.navigate(['/login']);
      }
      this.user = window.localStorage.getItem('user');
      var param = { session : "yes"};
      var send = JSON.stringify(param);
  		this.http.post('http://localhost/api/login.php', param, {responseType: 'text'}).subscribe((data) =>{
        this.responseData = data;
        console.log(data);
  		})
  	}

  	/*
  	

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
  		this.playlistModel = new newPlaylist("", "", "", "", 30, 15, null, this.user);
      document.getElementById("step1alert").innerHTML = "";
      document.getElementById("step2alert").innerHTML = "";
      document.getElementById("step3alert").innerHTML = "";
      this.resetSearch();


  	}
    resetSearch(){
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

}
