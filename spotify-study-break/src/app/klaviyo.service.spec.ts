import { TestBed } from '@angular/core/testing';

import { KlaviyoService } from './klaviyo.service';

describe('KlaviyoService', () => {
  let service: KlaviyoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlaviyoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
