import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaires.service';
import { Question } from 'src/app/models/question';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CodetableService } from 'src/app/services/codetable.service';
import { InitPageComponent } from '../init-page.component';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Entry } from 'src/app/models/entry';
import { DiaryService } from 'src/app/services/diary.service';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat';
import { Response } from 'src/app/models/response';
import { Diary } from 'src/app/models/diary';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { StudyService } from 'src/app/services/study.service';
import { ModelSurvey } from 'src/app/models/survey-models/survey';
import { Study } from 'src/app/models/study';
import { SurveyService } from 'src/app/services/survey.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-available-studies-list',
  templateUrl: './available.component.html',
  styleUrls: ['./studies.component.css']
})
export class AvailableStudiesComponent extends InitPageComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  displayedColumns = ['title', 'type', 'researcher', 'actions'];
  entryFlag: boolean;
  questionnaires: any;
  model: any;
  editEntryFlag: boolean;
  studyTypes: any;
  studyStatus: any;
  sex: any;
  displayStudy: boolean;
  listOfStudies: any;

  chatUsername: string;
  chatMessage: string;

  titleFormControl: any;
  studyTypeFormControl: any;

  /*Temporary additions */
  newStudyList: any;
  display = false;

  modelComponent: any;

  matcher = new MyErrorStateMatcher();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private questionnaireService: QuestionnaireService,
    private diaryService: DiaryService,
    private userService: UserService,
    private chatService: ChatService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private codetableService: CodetableService,
    private studyService: StudyService,
    private surveyService: SurveyService
  ) {
    super();
  }

  ngOnInit() {
    this.initializeOnLoad();

    this.codetableService.getData().subscribe(res => {
      // tslint:disable-next-line: no-string-literal
      this.studyTypes = res[0]['studyTypes'];
      // tslint:disable-next-line: no-string-literal
      this.studyStatus = res[0]['studyStatus'];
      // tslint:disable-next-line: no-string-literal
      this.sex = res[0]['sex'];
    });

    const ids = [];
    for (const study of this.loggedInUser.studies) {
      ids.push(study._id);
    }

    this.getStudies();

    if (this.loggedInUser.role === 2) {
      this.questionnaireService
        .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
        .subscribe(questionnaireRes => {
          if (questionnaireRes.length > 0) {
            for (const questionnaire of questionnaireRes) {
              this.listOfStudies.push(questionnaire);
            }
          }
          this.chatService
            .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
            .subscribe(chatRes => {
              if (chatRes.length > 0) {
                for (const chat of chatRes) {
                  this.listOfStudies.push(chat);
                }
              }
              this.diaryService
                .getFilteredData(this.loggedInUser.age, this.loggedInUser.sex, ids)
                .subscribe(diaryRes => {
                  if (diaryRes.length > 0) {
                    for (const diary of diaryRes) {
                      this.listOfStudies.push(diary);
                    }
                  }
                  this.listOfStudies = new MatTableDataSource(
                    this.listOfStudies
                  );
                  this.listOfStudies.sort = this.sort;
                  this.listOfStudies.paginator = this.paginator;
                });
            });
        });
    } else {
      this.questionnaireService.getData().subscribe(questionnaireRes => {
        if (questionnaireRes.length > 0) {
          for (const questionnaire of questionnaireRes) {
            this.listOfStudies.push(questionnaire);
          }
        }

        this.chatService.getData().subscribe(chatRes => {
          if (chatRes.length > 0) {
            for (const chat of chatRes) {
              this.listOfStudies.push(chat);
            }
          }

          this.diaryService.getData().subscribe(diaryRes => {
            if (diaryRes.length > 0) {
              for (const diary of diaryRes) {
                this.listOfStudies.push(diary);
              }
            }

            this.listOfStudies = new MatTableDataSource(this.listOfStudies);
            this.listOfStudies.sort = this.sort;
            this.listOfStudies.paginator = this.paginator;
          });
        });
      });
    }
  }

  initializeOnLoad() {
    this.listOfStudies = [];
    this.newStudyList;
    this.entryFlag = false;
    this.editEntryFlag = false;
    this.displayStudy = false;
    this.resetFieldErrors();
  }

  resetFieldErrors() {
    this.titleFormControl = new FormControl('', [
      Validators.required
    ]);

    this.studyTypeFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  close() {
    this.model = [];
    this.entryFlag = false;
    this.editEntryFlag = false;
    this.displayStudy = false;
  }

  applyFilter(filterValue: string) {
    this.listOfStudies.filter = filterValue.trim().toLowerCase();
  }

  addQuestion() {
    const question = new Question();
    this.model.questions.push(question);
  }

  addDiaryEntry() {
    const diaryEntry = new Entry();
    this.model.entries.push(diaryEntry);
  }

  addChatResponse() {
    const pushResponse = new Response();
    pushResponse.username = this.loggedInUser.username;
    pushResponse.message = this.chatMessage;
    this.model.responses.push(pushResponse);
    this.chatUsername = this.loggedInUser.username;
    this.chatMessage = '';
  }

  removeQuestion(index) {
    this.model.questions.splice(1, index);
  }

  addEntry() {
    this.model = { title: '', type: null };
    this.entryFlag = true;
  }

  initializeStudyType(studyType) {
    const title = this.model.title;
    const type = this.model.type;
    const upperAgeRange = this.model.upperAgeRange;
    const lowerAgeRange = this.model.lowerAgeRange;
    const sex = this.model.sex;

    this.model = new Study();
    this.model.title = title;
    this.model.type = type;
    this.model.upperAgeRange = upperAgeRange;
    this.model.lowerAgeRange = lowerAgeRange;
    this.model.sex = sex;

    if (studyType === 0) {
      this.modelComponent = new ModelSurvey();
    } else if (studyType === 1) {
      this.modelComponent = new Chat();
    } else if (studyType === 2) {
      this.modelComponent = new Diary();
    }
  }

  loadEntry(study) {
    this.model = study;
    this.displayStudy = true;
  }

  editEntry(study) {
    this.model = study;
    this.editEntryFlag = true;
  }

  studyValid() {
    let modelTypeCheck = false;
    let modelAgeRangeCheck = false;
    if (this.model.type || this.model.type === 0) {
      modelTypeCheck = true;
    }
    if (this.model.upperAgeRange || this.model.lowerAgeRange) {
      if (this.model.upperAgeRange >= this.model.lowerAgeRange) {
        modelAgeRangeCheck = true;
      }
    } else {
      modelAgeRangeCheck = true;
    }
    return !this.model.title
      || !modelTypeCheck
      || !this.model.type === undefined
      || !modelAgeRangeCheck
      ? false : true;
  }

  submitStudy() {
    if (!this.model.status) {
      this.model.status = 0;
    }
    this.loggedInUser.studies.push(this.model);

    const id = this.loggedInUser._id;

    this.userService.update(this.loggedInUser, id).subscribe(res => {
      if (res.status === 200) {
        this.close();
        this.authService.updateToken(id);
      }
    });
  }

  create() {
    if (this.model.lowerAgeRange === undefined) {
      this.model.lowerAgeRange = 0;
    }
    if (this.model.upperAgeRange === undefined) {
      this.model.upperAgeRange = 1000;
    }
    this.model.researcher = this.loggedInUser.username;

    this.createStudy()
      .then(result => {
        this.createModelComponent()
          .then(result => {
            this.model.component = this.modelComponent._id;
            this.modelComponent.studyId = this.model._id;
          })
          .then(() => {
            this.updateStudy()
            .then(result => {
              this.updateComponent()
                .then(result => {
                  this.getStudies()
                    .then(() => {
                      this.close();
                    })
                })
                .catch(err => {
                  if (err) {
                    throw err;
                  } 
                });
            })
            .catch(err => {
              if (err) throw err;
            });
          });
      })
      .catch(err => {
        if (err) {
          console.log('Something went wrong');
          throw err;
        }
      });
  }

  createStudy() {
    return new Promise((resolve, reject) => {
      this.studyService.create(this.model).subscribe(res => {
        if (res.status === 201) {
          this.model._id = res.body;
          resolve('Success');
        }
      }, err => {
        if (err) {
          reject(err);
        }
      });
    });
  }

  createModelComponent() {
    return new Promise((resolve, reject) => {
      if (this.model.type === 0) {
        this.surveyService.create(this.modelComponent).subscribe(res => {
          if (res.status === 201) {
            this.modelComponent._id = res.body;
            resolve('Success');
          }
        }, err => {
          if (err) {
            reject(err);
          }
        });

      } else if (this.model.type === 1) {
        this.chatService.create(this.model).subscribe(res => {
          if (res.status === 201) {
            this.modelComponent._id = res.body;
            resolve('Success');
          }
        }, err => {
          if (err) {
            reject(err);
          }
        });

      } else if (this.model.type === 2) {
        this.diaryService.create(this.model).subscribe(res => {
          if (res.status === 201) {
            this.modelComponent._id = res.body;
            resolve('Success');
          }
        }, err => {
          if (err) {
            reject(err);
          }
        });
      }
    });
  }

  updateStudy() {
    return new Promise((resolve, reject) => {
      this.studyService.update(this.model, this.model._id).subscribe(res => {
        if (res.status === 200)
          resolve('Success');
      }, err => {
        if (err) {
          reject();
        }
      });
    });
  }

  updateComponent() {
    return new Promise((resolve, reject) => {
      if (this.model.type === 0) {
        this.surveyService.update(this.modelComponent, this.modelComponent._id).subscribe(res => {
          if (res.status === 200)
            resolve('Success');
        }, err => {
          if (err) {
            reject();
          }
        });
      } else if (this.model.type === 2) {
        this.diaryService.update(this.modelComponent, this.modelComponent._id).subscribe(res => {
          if (res.status === 200)
            resolve('Success');
        }, err => {
          if (err) {
            console.log('Something went wrong updating the component');
            reject();
          }
        });
      }
      
    });
  }

  ngOnDestroy() {
    this.cdr.detach();
  }

  public getStudies() {
    return new Promise((resolve, reject) => {
      this.studyService.getData().subscribe((res) => {
        this.newStudyList = res;
        console.log(res);
        resolve('Success');
      },
        (err) => {
          if (err)
            reject();
        });
    });
  }
}
