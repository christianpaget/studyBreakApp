import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewPlaylistFormComponent } from './new-playlist-form/new-playlist-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateSuccessComponent } from './create-success/create-success.component';
import { UserPlaylistsComponent } from './user-playlists/user-playlists.component';

import { UserHomeComponent } from './user-home/user-home.component';
import { SpotifyPlayerComponent } from './spotify-player/spotify-player.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';
import { LogoutComponent } from './logout/logout.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { newPlaylist } from './new-playlist-form/newPlaylist';
//import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'new-playlist-form', component: NewPlaylistFormComponent},
{path: 'homepage', component: UserHomeComponent},
{path: '', redirectTo: '/login', pathMatch: 'full'},
{path: 'createSuccess', component: CreateSuccessComponent},
{path: 'user_home', component: UserHomeComponent},

{path: 'spotify-player', component: SpotifyPlayerComponent},
{path: 'spotify-login', component: SpotifyLoginComponent},

{path: 'logout', component: LogoutComponent},
{path: 'createUser', component: CreateUserComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewPlaylistFormComponent,
    HomepageComponent,
    CreateSuccessComponent,
    UserPlaylistsComponent,
    UserHomeComponent,
    SpotifyPlayerComponent,
    SpotifyLoginComponent,
    LogoutComponent,
    CreateUserComponent,
    //HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true, onSameUrlNavigation: 'reload'})
  ],
  providers: [
    //{provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
