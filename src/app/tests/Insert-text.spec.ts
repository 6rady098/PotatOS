import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StudySurveysComponent } from './study-surveys.component';
import { HttpClient } from '@angular/common/http';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


/*
 * The Describe function is just a way to group together tests
 * I don't recommend making new Describe functions
 */
describe('Inserttext', () => {
it('inserts new question to be filled')
  let component: StudySurveysComponent;
  let fixture: ComponentFixture<StudySurveysComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        StudySurveysComponent,
      ],
      providers: [
        SurveyService,
        HttpClient
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  expect(component.Inserttext).toEqual(false);
  component.edit();
  expect(component.Inserttext).toEqual(true);
});
