
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySurveysComponent } from './study-surveys.component';
import { HttpClient } from '@angular/common/http';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SurveyService } from 'src/app/services/survey.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


/*
 * The Describe function is just a way to group together tests 
 * I don't recommend making new Describe functions
 */
describe('StudySurveysComponent', () => {
  let component: StudySurveysComponent;
  let fixture: ComponentFixture<StudySurveysComponent>;

  /*
   * This beforeEach sets up the imports that we'll need  
   */
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
      schemas: [ NO_ERRORS_SCHEMA ] //This schema is absolutely necessary, otherwise you get a ton of errors
    })
      .compileComponents();
  }));

  /*
   * This beforeEach initializes some of the variables that we need.
   *
   * For example, this component has an @Input() that it would normally receive from its parent component.
   * Since this component isn't being created by its parent here, we have to manually pass in these values.
   * In this case, I needed a generic study (i.e. it doesn't need actual data), and one of my functions in the
   * ngOnInit() required a content_id, otherwise it would cause an error.
   * 
   * I also had to initialize the boolean manually, since it wasn't being done the way it normally should.
   * 
   * You will probably need to initialize more values like this, either before all tests, or at the beginning of one.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(StudySurveysComponent);
    component = fixture.componentInstance;
    component.study = { content_id: '' };
    component.displaySurveyMaker = false;
    fixture.detectChanges();
  });

  /*
   * Each it() represents an individual test.
   *
   * The string is simply a description of the test, that will appear in the console/browser output.
   * It then takes an anonymous function with no arguments, which is where the actual code is written.
   */
  it('should set displaySurveyMaker to true', () => {

    /*
     * expect is basically like the "assert" statements in JUnit.
     * expect takes the "actual" value, toEqual takes the expected one
     * 
     * Note that expect() has many other kinds of statements besides toEqual(); use Ctrl + F to display them.
     */
    expect(component.displaySurveyMaker).toEqual(false);
    component.edit();
    expect(component.displaySurveyMaker).toEqual(true);
  });

  it('should set displaySurveyMaker to false', () => {
    component.hideEdit();
    expect(component.displaySurveyMaker).toEqual(false);
  });
});
