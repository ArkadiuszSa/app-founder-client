import { TestBed, inject } from '@angular/core/testing';

import { InvitationsService } from './invitations.service';

describe('InvitationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationsService]
    });
  });

  it('should be created', inject([InvitationsService], (service: InvitationsService) => {
    expect(service).toBeTruthy();
  }));
});
