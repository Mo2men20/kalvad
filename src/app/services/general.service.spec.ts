import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { GeneralService } from './general.service';

describe('GeneralService', () => {
  let service: GeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(GeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
