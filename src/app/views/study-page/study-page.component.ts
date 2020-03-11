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
   * Indicates whether the study is a questionnaire, diary or chat log
   * 0: Questionnaire
   * 1: Chat log
   * 2: Diary
   */
  studyType: number;

  /**
   * This ViewChild corresponds to the embedded <survey-view> component that
   * is attached in cases where the study is of type questionnaire/survey
   */
  @ViewChild(SurveyViewComponent, null) surveyView;
  surveyList: ModelSurvey[];
  survey: ModelSurvey;
  displaySurvey: boolean;

  studies: any;
  study: any;

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

  ngOnInit() {
    //this.studyType = this.study.type; //Enable this when the page is hooked up to the cards
    this.surveyList = [];
    this.surveyService.getData().subscribe( //This will need to be removed, as the study will be passed in from the studycard
      (res) => {
        this.surveyList = res;
        console.log(this.surveyList);
        this.survey = this.surveyList[0];
      },
      (err) => {
        if(err)
          throw err;
      }
    );
    this.studyType = 0;
    this.studies = [];
    this.questionnaireService.getData().subscribe(
      
    );
  }


  public renderSurvey(): void {
    this.displaySurvey = true;
    this.surveyView.render(this.survey);
  }

  public hideSurvey(): void {
    this.displaySurvey = false;
  }
}
