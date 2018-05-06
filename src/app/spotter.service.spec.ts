import { TestBed, inject } from '@angular/core/testing';

import { SpotterService } from './spotter.service';

describe('SpotterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotterService]
    });
  });

  it('should be created', inject([SpotterService], (service: SpotterService) => {
    expect(service).toBeTruthy();
  }));
});
