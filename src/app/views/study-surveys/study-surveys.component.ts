/**
 * This component handles every other component that deals with surveys in
 * the context of the study-page component. This is where the survey-marker
 * and survey-view are displayed to researcher and/or participant.
 * 
 * @author Frederic Joly
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SurveyViewComponent } from '../surveys/survey-view/survey-view.component';
import { SurveyMakerComponent } from '../surveys/survey-maker/survey-maker.component';
import { ModelSurvey } from 'src/app/models/survey-models/survey';
import { Checkbox } from 'src/app/models/survey-models/checkbox';
import { Radiogroup } from 'src/app/models/survey-models/radiogroup';
import { SurveyService } from 'src/app/services/survey.service';
import { StudyService } from 'src/app/services/study.service';
import { SurveyService } from 'src/app/services/survey.service';
import { InitPageComponent } from '../init-page.component';

@Component({
  selector: 'survey',
  templateUrl: './study-surveys.component.html',
  styleUrls: ['./study-surveys.component.css']
})
export class StudySurveysComponent extends InitPageComponent implements OnInit {

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
    private surveyService: SurveyService
  ) {
    super();
    this.isLoaded = false;

  }

  ngOnInit() {
    this.getSurvey(this.study.content_id)
      .then(() => {
        this.refreshSurvey();
      });
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
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * This function hides the survey.
   */
  public async hideEdit() {
    await this.updateSurvey()
      .then(() => {
        this.surveyWidth = 100; //We reset the width of the survey to take up the whole panel
        this.displaySurveyMaker = false;
        this.refreshSurvey();
      })/*
      .then(value => {
        this.refreshSurvey();
      })*/
      .catch(err => {
        if (err) throw err;
      });
  }
 
  /**
   * When the Survey-Maker is active, this function updates the model passed into the survey
   * and renders it, to show the updates made to the survey (as it doesn't update dynamically).
   */
  public refreshSurvey() {
    console.log('Refreshing Survey...');
    this.displaySurvey = true;

    if (this.surveyView) {
      this.surveyView.render(this.survey);
    }
  }

  /**
   * This function retrieves the list of surveys from the database.
   */
  private async getSurvey(_id: string) {
    if (_id) {
      await new Promise((resolve, reject) => {
        console.log('Beginning search for the corresponding survey');
        this.surveyService.getDataById(_id).subscribe(res => {
          console.log('SurveyService found survey ' + _id);
          this.survey = res.body;
          this.isLoaded = true;
          resolve();
        },
          err => {
            console.warn('Error occurred while retrieving survey ' + _id);
            reject(err);
          });
      });
    }
  }

  /**Updates the current survey's entry in the database */
  public async updateSurvey() {
    await new Promise((resolve, reject) => {
      if (this.surveyMaker) {
        this.surveyMaker.updateSurvey()
          .then(() => {
            resolve('Success');
          })
          .catch(err => {
            reject(err);
          });
      } else {
        reject('Could not update survey, surveyMaker object is null');
      }
    });
  }

  public resetSurvey() {

    if (this.surveyMaker) { //Check to make sure that the survey-maker is not null

      console.log('Resetting survey...');

      this.surveyMaker.resetSurvey()
        .then(() => { //If the resetSurvey() method succeeds, we can then retrieve the new version of the survey, and refresh the survey-view
          this.getSurvey(this.study.content_id)
            .then(() => {
              this.refreshSurvey();
            })
            .catch(err => {
              console.log('Something went wrong while resetting this survey');
              if (err)
                throw err;
            });
        })
        .catch(err => {
          console.warn('Something went wrong while trying to reset the survey');

          if (err) throw err;
        });
    }
  }

  public startSurvey() {
    this.survey.mode = '';
    this.refreshSurvey();
  }

  public resetTestSurvey() {
    this.refreshSurvey();
  }

  public stopSurvey() {
    this.survey.mode = 'display';
    this.refreshSurvey();
  }
}