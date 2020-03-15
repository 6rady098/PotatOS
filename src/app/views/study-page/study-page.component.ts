import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { DiaryService } from 'src/app/services/diary.service';
import { UserService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { ModelSurvey } from 'src/app/models/survey-models/survey';
import { SurveyService } from 'src/app/services/survey.service';
import { InitPageComponent } from '../init-page.component';
import { SurveyViewComponent } from '../surveys/survey-view/survey-view.component';
import { Checkbox } from 'src/app/models/survey-models/checkbox';
import { Radiogroup } from 'src/app/models/survey-models/radiogroup';
import { SurveyMakerComponent } from '../surveys/survey-maker/survey-maker.component';
import { StudyService } from 'src/app/services/study.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.css']
})
export class StudyPageComponent extends InitPageComponent implements OnInit {

  /**
   * This ViewChild corresponds to the embedded <survey-view> component that
   * is attached in cases where the study is of type questionnaire/survey
   */
  @ViewChild(SurveyViewComponent, null) surveyView;
  @ViewChild(SurveyMakerComponent, null) surveyMaker;
  surveyList: ModelSurvey[];
  survey: ModelSurvey;

  surveyWidth: number;

  /**Determines the size (as a percentage) of the survey-marker component for editing surveys */
  private readonly surveyMakerWidth = 55;
  /**Determines the size (as a percentage) of the sidebar */
  private readonly sidebarWidth = 15;
  /**Determines the size (as a percentage) of the main display panel based on the size of the sidebar */
  private readonly mainPanelWidth = 100 - this.sidebarWidth;

  displaySurvey: boolean;
  displaySurveyMaker: boolean;

  study: any;
  studyId: string;
  studyTypes: any;
  type: string;
  studySexes: any;
  sex: string;
  studyStatus: any;
  status: string;


  constructor(
    private questionnaireService: QuestionnaireService,
    private diaryService: DiaryService,
    private userService: UserService,
    private chatService: ChatService,
    private authService: AuthService,
    private codetableService: CodetableService,
    private surveyService: SurveyService,
    private studyService: StudyService,
    private route: ActivatedRoute
  ) {
    super();

    this.route.params.subscribe((params) => {
      this.studyId = params.id;
      this.getStudy(this.studyId);
    },
    (err) => {
      if(err)
        throw err;
    });
  }

  /**
   * One of the Angular component lifecycle methods.
   */
  ngOnInit() {
    this.resetBooleans();
    //this.studyType = this.study.type; //Enable this when the page is hooked up to the cards
    this.displaySurvey = true;
    this.surveyList = [];
    this.surveyWidth = 100;    
    this.getCodeTable();
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

  public showSurveyMaker(): void {
    /* 
     * This calculation determines the value of the fxFlex attribute of the div in which the survey-maker is located.
     * Since the end result is a percentage, we subtract from 100. The size of the survey-maker is assumed to be static,
     * but the survey-view is used for other features, so we resize it to fit next to the survey-maker.
     */
    try {
      this.surveyWidth = 100 - this.surveyMakerWidth;
      this.displaySurveyMaker = true;
      this.displaySurvey = true;
      this.preview();
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * This function hides the survey.
   */
  public hideSurveyMaker(): void {
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
  public preview() {
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
   * This function fetches all of the codetable values (e.g. the sexes, study type codes, etc) and loads them into
   * arrays. These values can then be accessed in the HTML component using statements such as: 
   * "{{ studyTypes | findValue : study.type : selectedLanguage }}" which converts the study code (e.g. 0) into
   * "Questionnaire", adjustable by language.
   */
  private getCodeTable(): void {
    this.codetableService.getData().subscribe(
      (res) => {
        this.studySexes = res[0]['sex'];
        this.studyStatus = res[0]['studyStatus'];
        this.studyTypes = res[0]['studyTypes'];
      },
      (err) => {
        if (err)
          throw err;
      }
    );
  }

  /**
   * This function retrieves the list of surveys from the database. Currently, it takes the first one and loads it directly, for testing.
   */
  private getSurvey(_id: string): void {
    this.surveyService.getDataById(_id).subscribe(
      (res) => {
        this.survey = res.body;
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

  /**
   * Currently, this function only searches for questionnaires, takes the first one, and loads it as this page's study for testing purposes.
   * 
   * TODO: modify this to only retrieve the study being passed into it from the Grid List, then change the object type to retrieve the new "Study"
   * objects, which combines all of the study fields from the Diary, Questionnaire and Chat Log objects into a single class.
   */
  private getStudy(_id: string) {
    this.studyService.getDataById(_id).subscribe(
      (res) => {
        this.study = res.body;
        this.type = this.study.type;
        this.getSurvey(this.study.content_id);
      },
      (err) => {
        if (err)
          throw err;
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
