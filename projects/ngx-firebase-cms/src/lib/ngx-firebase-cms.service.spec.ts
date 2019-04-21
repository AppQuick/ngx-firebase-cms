import { TestBed } from '@angular/core/testing';

import { NgxFirebaseCMSService } from './ngx-firebase-cms.service';

describe('NgxFirebaseCMSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFirebaseCMSService = TestBed.get(NgxFirebaseCMSService);
    expect(service).toBeTruthy();
  });
});
