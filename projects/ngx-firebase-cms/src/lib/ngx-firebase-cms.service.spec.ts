import { TestBed } from '@angular/core/testing';

import { NgxFirebaseCmsService } from './ngx-firebase-cms.service';

describe('NgxFirebaseCmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFirebaseCmsService = TestBed.get(NgxFirebaseCmsService);
    expect(service).toBeTruthy();
  });
});
