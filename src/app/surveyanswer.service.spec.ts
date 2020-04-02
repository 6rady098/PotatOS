import { TestBed } from '@angular/core/testing';

import { SurveyanswerService } from './surveyanswer.service';

describe('SurveyanswerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyanswerService = TestBed.get(SurveyanswerService);
    expect(service).toBeTruthy();
  });
});
