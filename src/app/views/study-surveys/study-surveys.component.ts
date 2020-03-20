import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SurveyViewComponent } from '../surveys/survey-view/survey-view.component';
import { SurveyMakerComponent } from '../surveys/survey-maker/survey-maker.component';
import { ModelSurvey } from 'src/app/models/survey-models/survey';
import { Checkbox } from 'src/app/models/survey-models/checkbox';
import { Radiogroup } from 'src/app/models/survey-models/radiogroup';
import { SurveyService } from 'src/app/services/survey.service';
import { StudyService } from 'src/app/services/study.service';
import { InitPageComponent } from '../init-page.component';

@Component({
  selector: 'survey',
  templateUrl: './study-surveys.component.html',
  styleUrls: ['./study-surveys.component.css']
})
export class StudySurveysComponent extends InitPageComponent implements OnInit {

  /**Represents the MongoDB ID assigned to the survey that is associated with this study */
  surveyId: string;

   /**
   * This ViewChild corresponds to the embedded <survey-view> component that
   * is attached in cases where the study is of type questionnaire/survey
   */
  @ViewChild(SurveyViewComponent, { static: false }) surveyView;
  @ViewChild(SurveyMakerComponent, { static: false }) surveyMaker;
  survey: ModelSurvey;

  displaySurvey: boolean;
  displaySurveyMaker: boolean;
  isLoaded: boolean;

  @Input() study: any;
  surveyWidth: number;

  /**Determines the size (as a percentage) of the survey-marker component for editing surveys */
  private readonly surveyMakerWidth = 55;

  constructor(
    private surveyService: SurveyService,
    private studyService: StudyService
  ) {
    super();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.getSurvey(this.study.content_id);
    this.displaySurvey = true;
    this.surveyWidth = 100;    
  }

  /**
   * This method resets all booleans to false.
   */
  public resetBooleans(): void {
    this.displaySurvey = false;
    this.displaySurveyMaker = false;
  }

   /**
   * If the study is a questionnaire/survey, this function tells the survey-view
   * component to render the study's survey, and displays it on the page.
   */
  public renderSurvey(): void {
    this.displaySurvey = true;

    if(this.surveyView != null) {
      this.surveyView.render(this.survey);
    } 
  }

  /**
   * If the study is a questionnaire/survey, this method hides the survey.
   */
  public hideSurvey(): void {
    this.displaySurvey = false;
  }

  public edit(): void {
    /* 
     * This calculation determines the value of the fxFlex attribute of the div in which the survey-maker is located.
     * Since the end result is a percentage, we subtract from 100. The size of the survey-maker is assumed to be static,
     * but the survey-view is used for other features, so we resize it to fit next to the survey-maker.
     */
    try {
      this.surveyWidth = 100 - this.surveyMakerWidth;
      this.displaySurveyMaker = true;
      this.displaySurvey = true;
      this.refreshSurvey();
    } catch(e) {
      console.log(e);
    }
  }

    

  /**
   * This function hides the survey.
   */
  public hideEdit(): void {
    this.displaySurveyMaker = false;
    this.updateSurvey();
    this.getSurvey(this.study.content_id);
    /*We reset the width of the survey to take up the whole panel */
    this.surveyWidth = 100;
  }


    /**
   * When the Survey-Maker is active, this function updates the model passed into the survey
   * and renders it, to show the updates made to the survey (as it doesn't update dynamically).
   */
  public refreshSurvey() {
    console.log('Rendering Survey...');
    var elements = this.survey.pages[0].elements;

    /*
     * This loop is necesssary in order to convert the Choice object array into an array of strings.
     * The Choice objects are necessary to pass data between the components (else the data won't update correctly),
     * but the survey component can only interpret a string array. This step prepares the string array to be read
     * by the survey component. 
     */
    for (let i = 0; i < elements.length; i++) {

      if (elements[i] instanceof Checkbox) {
        <Checkbox>elements[i].convertChoices();

      } else if (elements[i] instanceof Radiogroup) {
        <Radiogroup>elements[i].convertChoices();
      }
    }
    this.surveyView.render(this.survey);
  }

  
  /**
   * This function retrieves the list of surveys from the database. Currently, it takes the first one and loads it directly, for testing.
   */
  private getSurvey(_id: string): void {
    this.surveyService.getDataById(_id).subscribe(
      (res) => {
        console.log('Survey found, loading data');
        this.survey = res.body;
        this.isLoaded = true;
        this.renderSurvey();
      },
      (err) => {
        if (err) {
          console.log("Something went wrong loading the survey");
          throw err;
        }
      }
    );
  }

   /**Updates the current survey's entry in the database */
  public updateSurvey() {
    this.surveyService.update(this.survey, this.survey._id).subscribe(
      res => {
        console.log('Update successful');
      },
    
      err => {
        if(err) {
          throw err;
        }
    });
  }
}


//TODO: fix the update function to update the model correctly