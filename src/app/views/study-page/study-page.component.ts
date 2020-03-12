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
    private surveyService: SurveyService
  ) {
    super();
  }

  /**
   * One of the Angular component lifecycle methods.
   */
  ngOnInit() {
    this.resetBooleans();
    //this.studyType = this.study.type; //Enable this when the page is hooked up to the cards
    this.surveyList = [];
    this.surveyWidth = 100;

    this.questionnaireService.getData().subscribe(
      (res) => {
        this.study = res[0];
      },
      (err) => {
        if(err)
          throw err;
      }
    );

    this.codetableService.getData().subscribe(
      (res) => {
        this.studySexes = res[0]['sex'];
        this.studyStatus = res[0]['studyStatus'];
        this.studyTypes = res[0]['studyTypes'];
      },
      (err) => {
        if(err)
          throw err;
      }
    );

    this.surveyService.getData().subscribe( //This will need to be removed, as the study will be passed in from the studycard
      (res) => {
        this.surveyList = res;
        this.survey = this.surveyList[0];
      },
      (err) => {
        if(err)
          throw err;
      }
    );
        
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
    this.surveyView.render(this.survey);
  }

  /**
   * If the study is a questionnaire/survey, this method hides the survey.
   */
  public hideSurvey(): void {
    this.displaySurvey = false;
  }

  public showSurveyMaker(): void {
    /* 
     * This calculation determines the value of the fxFlex attribute of the div in which the survey-maker is located
     * Since the end result is a percentage, we subtract from 100. The size of the survey-maker is assumed to be static,
     * but the survey-view is re-used whether previewing the survey, or editing it. 
     */
    this.surveyWidth = 100 - this.surveyMakerWidth;
    this.displaySurveyMaker = true;
    this.renderSurvey();
  }

  public hideSurveyMaker(): void {
    this.displaySurveyMaker = false;
    this.hideSurvey();

    /*We reset the width of the survey to take up the whole panel */
    this.surveyWidth = 100;
  }

  public preview() {
    /*    console.log('Rendering Survey...');
    
        for(let i = 0; i < this.elements.length; i++) {
          if(this.elements[i] instanceof Checkbox) {
            <Checkbox>this.elements[i].convertChoices();
          } else if(this.elements[i] instanceof Radiogroup) {
            <Radiogroup>this.elements[i].convertChoices();
          }
        }
    
        this.surveyView.render(this.model);*/
      }
}
