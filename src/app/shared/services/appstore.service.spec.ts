import { TestBed, inject } from '@angular/core/testing';

import { AppstoreService } from './appstore.service';

describe('AppstoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppstoreService]
    });
  });

  it('should be created', inject([AppstoreService], (service: AppstoreService) => {
    expect(service).toBeTruthy();
  }));
});
