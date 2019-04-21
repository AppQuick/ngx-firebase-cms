import { TestBed } from '@angular/core/testing';

import { UnsubscriptionService } from './unsubscription.service';

describe('UnsubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnsubscriptionService = TestBed.get(UnsubscriptionService);
    expect(service).toBeTruthy();
  });
});
