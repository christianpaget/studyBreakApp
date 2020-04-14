import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  title = 'Study Break';

  left = 'See what you listened to last time!'

  goToPlaylist(){
  	this.router.navigate(['/new-playlist-form']);
  }
}
