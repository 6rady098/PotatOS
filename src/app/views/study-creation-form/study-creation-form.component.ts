import { Component, OnInit, Input } from '@angular/core';
import { InitPageComponent } from '../init-page.component';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { DiaryService } from 'src/app/services/diary.service';
import { UserService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { SurveyService } from 'src/app/services/survey.service';
import { StudyService } from 'src/app/services/study.service';

@Component({
  selector: 'study-creation-form',
  templateUrl: './study-creation-form.component.html',
  styleUrls: ['./study-creation-form.component.css']
})
export class StudyCreationFormComponent extends InitPageComponent implements OnInit {

  @Input() study: any;
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
    private studyService: StudyService
  ) {
    super();
  }

  ngOnInit() {
    this.getCodeTable();
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
   * Currently, this function only searches for questionnaires, takes the first one, and loads it as this page's study for testing purposes.
   * 
   * TODO: modify this to only retrieve the study being passed into it from the Grid List, then change the object type to retrieve the new "Study"
   * objects, which combines all of the study fields from the Diary, Questionnaire and Chat Log objects into a single class.
   */
  private getStudy(): void {
    this.questionnaireService.getData().subscribe(
      (res) => {
        this.study = res[0];
        this.type = this.study.type;
      },
      (err) => {
        if (err)
          throw err;
      }
    );
  }
}
