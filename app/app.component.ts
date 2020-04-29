import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Study Break';

logged_in: string;

ngOnInit(){
    this.logged_in = this.readLocalStorageValue('user');
}
  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
}
}
