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

  editMode: boolean;

  constructor(
    private codetableService: CodetableService,
    private studyService: StudyService
  ) {
    super();
    this.editMode = false;
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

  async getStudy() {
    await new Promise((resolve, reject) => {
      this.studyService.getDataById(this.study._id).subscribe(
        (res) => {
          this.study = res.body;
          this.type = this.study.type;
          resolve();
        },
        (err) => {
          if (err)
            reject(err);
        }
      );
    });
  }

  async deleteStudy() {
    await new Promise((resolve, reject) => {
      this.studyService.delete(this.study._id).subscribe(res => {
        resolve();
      }, err => {
        reject(err);
      });
    });
  }

  edit() {
    this.editMode = true;
  }

  hideEdit() {
    this.updateStudy()
      .then(() => {
        this.editMode = false;
      });
  }

  async updateStudy() {
    await new Promise((resolve, reject) => {
      this.studyService.update(this.study, this.study._id).subscribe(
        res => {
          if (res.status === 200) {
            resolve();
          }
        }, err => {
          if (err)
            reject(err);
        }
      );
    });
  }
}
