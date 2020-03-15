import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { DiaryService } from 'src/app/services/diary.service';
import { UserService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { SurveyService } from 'src/app/services/survey.service';
import { StudyService } from 'src/app/services/study.service';
import { InitPageComponent } from '../init-page.component';

@Component({
  selector: 'diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css']
})
export class DiaryFormComponent extends InitPageComponent implements OnInit {

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
  }

}
