/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BrowserStorageServerService } from './browser-storage-server.service';

describe('Service: BrowserStorageServer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserStorageServerService]
    });
  });

  it('should ...', inject([BrowserStorageServerService], (service: BrowserStorageServerService) => {
    expect(service).toBeTruthy();
  }));
});
