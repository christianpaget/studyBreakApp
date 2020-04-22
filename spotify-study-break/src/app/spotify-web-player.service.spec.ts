import { TestBed } from '@angular/core/testing';

import { SpotifyWebPlayerService } from './spotify-web-player.service';

describe('SpotifyWebPlayerService', () => {
  let service: SpotifyWebPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyWebPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
