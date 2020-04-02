/**
 * This component displays the study-pages, which is where the details of a study
 * are displayed, where the researcher can edit a study/survey/etc., and where the
 * participant will be able to complete a study.
 *
 * @author Frederic Joly
 * @author Brady Ryan
 */
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CodetableService } from 'src/app/services/codetable.service';
import { InitPageComponent } from '../init-page.component';
import { StudyService } from 'src/app/services/study.service';
import { ActivatedRoute } from '@angular/router';
import { StudyCreationFormComponent } from '../study-creation-form/study-creation-form.component';
import { StudySurveysComponent } from '../study-surveys/study-surveys.component';
import { DiaryFormComponent } from '../diary-form/diary-form.component';

@Component({
  selector: 'study-page',
  templateUrl: './study-page.component.html',
  styleUrls: ['./study-page.component.css']
})
export class StudyPageComponent extends InitPageComponent implements OnInit {

  /**Represents the component that holds the form for editing/viewing the details of the study */
  @ViewChild(StudyCreationFormComponent, { static: true }) studyForm;
  /**Represents the component that holds all survey-related elements, such as the survey-maker and the survey-view */
  @ViewChild(StudySurveysComponent, { static: false }) studySurvey;
  /**Represents the component that holds all diary-related elements */
  @ViewChild(DiaryFormComponent, { static: false }) diaryForm;


  /**Determines the size (as a percentage) of the sidebar */
  private readonly sidebarWidth = 15;
  /**Determines the size (as a percentage) of the main display panel based on the size of the sidebar */
  private readonly mainPanelWidth = 100 - this.sidebarWidth;

  /**This is the model for the study that is on display */
  study: any;
  /**This is the unique MongoDB _id of the study */
  studyId: string;
  /**This is an array loaded from the codetable that holds all values for the study types, from 0 to 2, with associated string values */
  studyTypes: any;
  /**Holds the value of the current study's type, i.e. 0 for questionnaire, 2 for dairy, etc.*/
  type: number;
  /**This is an array that holds all possible values for the "sex" property of a study */
  studySexes: any;
  /**This represents the sex(es) that the researcher wants to limit this study to*/
  sex: string;
  /**This is an array that holds all possible values for the study statuses (e.g. "Completed", "In-Progress"). */
  studyStatus: any;
  /**The active study's status */
  status: string;

  /**This boolean prevents certain elements on the page from loading until the study data is retrieved from the database */
  isLoaded: boolean;
  /**This boolean determines whether the study and its content are in edit mode */
  editable: boolean;
  /**This boolean sets the page to "Test Mode" to allow a researcher to test a survey */
  isSurveyActive: boolean;

  constructor(
    private codetableService: CodetableService,
    private studyService: StudyService,
    private route: ActivatedRoute
  ) {
    super();
    this.initialize();
  }

  /**
   * One of the Angular component lifecycle methods.
   */
  ngOnInit() {

  }

  private initialize() {
    this.getCodeTable();
    this.loadStudy();
    this.isLoaded = false;
    this.editable = false;
    this.isSurveyActive = false;
  }

  public loadStudy() {
    this.route.params.subscribe((params) => {
      this.studyId = params.id;
      this.getStudy(this.studyId);
    },
      (err) => {
        if (err)
          throw err;
      });
  }

  /**
   * This function fetches all of the codetable values (e.g. the sexes, study type codes, etc) and loads them into
   * arrays. These values can then be accessed in the HTML component using statements such as:
   * "{{ studyTypes | findValue : study.type : selectedLanguage }}" which converts the study code (e.g. 0) into
   * "Questionnaire", adjustable by language.
   */
  private async getCodeTable() {
    this.codetableService.getData().subscribe(
      (res) => {
        console.log('Retrieved the codetable successfully');
        this.studySexes = res[0]['sex'];
        this.studyStatus = res[0]['studyStatus'];
        this.studyTypes = res[0]['studyTypes'];
      },
      (err) => {
        console.log('Something went wrong while loading the codetable in the study-page component');
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
  private async getStudy(_id: string) {
    console.log('Fetching the study');
    this.studyService.getDataById(_id).subscribe(
      (res) => {
        this.study = res.body;
        this.type = this.study.type;
        this.sex = this.study.sex;
        this.isLoaded = true;
      },
      (err) => {
        console.log('Something went wrong loading the study from the database in the study-page component');
        if (err)
          throw err;
      }
    );
  }

  /**
   * Switches on the page to Edit Mode, and invokes the appropriate child components' edit methods
   */
  public edit() {

    if (this.type == 0) {
      this.studySurvey.edit();
    } else
    if (this.type == 2) {
      this.diaryForm.edit();
      //TODO: Add code to toggle the diary's edit mode
    }

    this.editable = true;
  }

  /**
   * Switches off the page's edit mode and hides all edit forms
   */
  public hideEdit() {

    if (this.type == 0) {
      this.studySurvey.hideEdit();
    } else if (this.type == 2) {
      //TODO: Add code to toggle the diary's edit mode
      this.diaryForm.hideEdit();
    }

    this.editable = false;
  }

  /**
   * If the study is of type questionnaire/survey, this refreshes the survey's model
   */
  public refreshSurvey() {
    if (this.type === 0) {
      if (this.studySurvey != null && typeof this.studySurvey !== 'undefined') {
        this.studySurvey.refreshSurvey();
      }
    }
  }

  /**
   * If the study is of type questionnaire/survey, this updates the survey in the database
   */
  public updateSurvey() {
    if (this.type === 0) {
      if (this.studySurvey != null && typeof this.studySurvey !== 'undefined') {
        this.studySurvey.updateSurvey();
      }
    }
  }

  public resetSurvey() {
    if(this.type === 0 && this.studySurvey) {
      this.studySurvey.resetSurvey();
    }
  }

  public startSurvey() {
    this.isSurveyActive = true;
    if (this.type == 0) {
      this.studySurvey.startSurvey();
    } else
    if (this.type == 2) {
      this.diaryForm.startSurvey();
    }
  }

  public resetTestSurvey() {
    this.studySurvey.resetTestSurvey();
  }

  public stopSurvey() {
    this.isSurveyActive = false;
    if (this.type == 0) {
      this.studySurvey.stopSurvey();
    } else
    if (this.type == 2) {
      this.diaryForm.stopSurvey();
    }
  }
}

//TODO: Add dialog boxes for the survey reset and delete buttons
