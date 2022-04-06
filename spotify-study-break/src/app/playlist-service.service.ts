import { Injectable } from '@angular/core';
import { newPlaylist } from './new-playlist-form/newPlaylist'

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {
  public listenPlaylist;

  constructor() { }
}
