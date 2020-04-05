import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { DiaryService } from 'src/app/services/diary.service';
import { UserService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CodetableService } from 'src/app/services/codetable.service';
import { SurveyService } from 'src/app/services/survey.service';
import { Input, ViewChild } from '@angular/core';
import { Diary } from 'src/app/models/diary';
import { Entry } from 'src/app/models/entry';
import { StudyService } from 'src/app/services/study.service';
import { InitPageComponent } from '../init-page.component';

@Component({
  selector: 'diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.css']
})
export class DiaryFormComponent extends InitPageComponent implements OnInit {

  diary: Diary
  displayDiary: boolean;
  displayDiaryEdit: boolean;
  isLoaded: boolean;
  newEntryForParticipant: Entry;
  @Input() study: any;

  constructor(
    private diaryService: DiaryService
  ) {
    super();
    this.isLoaded = false;
  }

  ngOnInit() {
    this.getDiary(this.study.content_id);
    this.displayDiary = true;
    this.displayDiaryEdit = false;
  }

  /*
   * show edit view
   */
  public edit(): void {
    this.displayDiaryEdit = true;
  }

  public startSurvey(): void {
    if(this.loggedInUser.role === 2){
      this.newEntryForParticipant = {date: new Date(), entry: ""}
    }
    this.displayDiaryEdit = true;
  }

  public async stopSurvey() {
    if(this.loggedInUser.role === 2){
      this.diary.entries.push(this.newEntryForParticipant);
    }
    await this.updateDiary()
      .then(() => {
        this.displayDiaryEdit = false;
      })/*
      .then(value => {
        this.refreshSurvey();
      })*/
      .catch(err => {
        if (err) throw err;
      });
  }

  /*
   * show edit view
   */
  public newEntry(): void {
    this.diary.entries.push({ date: new Date(), entry: ""});
  }

  /**
   * This function hides the edit view.
   */
  public async hideEdit() {
    await this.updateDiary()
      .then(() => {
        this.displayDiaryEdit = false;
      })/*
      .then(value => {
        this.refreshSurvey();
      })*/
      .catch(err => {
        if (err) throw err;
      });
  }
  /**
   * This function retrieves the diary from the database.
   */
  private async getDiary(_id: string) {
    if (_id) {
      await new Promise((resolve, reject) => {
        console.log('Beginning search for the corresponding diary');
        this.diaryService.getDataById(_id).subscribe(res => {
          console.log('DiaryService found diary ' + _id);
          this.diary = res.body;
          this.isLoaded = true;
          resolve();
        },
          err => {
            console.warn('Error occurred while retrieving diary ' + _id);
            reject(err);
          });
      });
    }
  }

  /**Updates the current diary's entry in the database */
  public async updateDiary() {
    await new Promise((resolve, reject) => {
      this.diaryService.update(this.diary, this.diary._id).subscribe(
        res => {
          if (res.status === 200) {
            console.log('Update successful');
            resolve('Success');
          }
        },

        err => {
          if (err) {
            reject(err);
          }
        });
    });
  }

}
