import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
    }

  ngOnInit(): void {
    if(!window.localStorage.getItem('auth_token') || window.localStorage.getItem('auth_token')==undefined){
      //this.activatedRoute.queryParams.subscribe(params => {
      let params = this.activatedRoute.snapshot.fragment;
      let token = params.split('&')[0];
      let arg = token.split('=');
        console.log(arg[1]);
        if(arg[1])
          window.localStorage.setItem('auth_token', arg[1]);

      //});
    }
    console.log(window.localStorage.getItem('auth_token'));
  
  }

  title = 'Study Break';

  left = 'See what you listened to last time!'

  goToPlaylist(){
  	this.router.navigate(['/new-playlist-form']);
  }
}
