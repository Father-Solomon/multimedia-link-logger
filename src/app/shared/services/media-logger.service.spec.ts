import { TestBed } from '@angular/core/testing';

import { MediaLoggerService } from './media-logger.service';

describe('MediaLoggerService', () => {
  let service: MediaLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
