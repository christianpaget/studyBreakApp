import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewPlaylistFormComponent } from './new-playlist-form/new-playlist-form.component';
//import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'new-playlist-form', component: NewPlaylistFormComponent},
//{path: 'home', component: HomeComponent},
{path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewPlaylistFormComponent,
    //HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
