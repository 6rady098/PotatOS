import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModelSurvey } from '../../../models/survey-models/survey';
import { Checkbox } from '../../../models/survey-models/checkbox';
import { IElement } from 'src/app/models/survey-models/IElement';
import { Radiogroup } from 'src/app/models/survey-models/radiogroup';
import { TextElement } from 'src/app/models/survey-models/textelement';
import { SurveyViewComponent } from '../survey-view/survey-view.component';
import { SurveyService } from 'src/app/services/survey.service';
import { InitPageComponent } from '../../init-page.component';

@Component({
  selector: 'survey-maker',
  templateUrl: './survey-maker.component.html',
  styleUrls: ['./survey-maker.component.css']
})
export class SurveyMakerComponent extends InitPageComponent implements OnInit {

  public readonly navigationBarPositions = [ 'top', 'bottom', 'both' ];
  public readonly elementTypes = [ 'text', 'checkbox', 'radiogroup'/*, 'dropdown', 'comment', 'boolean', 'rating'*/ ];
  private readonly pageMode = 'singlePage';
  showDebug = false;
  questionType: string;
  @Input() model: ModelSurvey;
  elements: IElement[];
  showSurvey: boolean;
  surveys: ModelSurvey[];
  displayedColumns = [ 'title', 'elements', 'options' ];
  showTable = false;

  constructor(
    private surveyService: SurveyService
  ) {
    super();
  }

  ngOnInit() {
    this.initialize();
  }

  private initialize() {
    this.showSurvey = true;

    if(this.model == null) {
      console.log("Initializing survey-maker model to default");
      this.model = new ModelSurvey();
    }

    this.elements = this.model.pages[0].elements;
    this.model.progressBarType = "questions";
    this.questionType = "";
    this.model.mode = 'display';
    this.refreshData();
  }

  public addQuestion(type: string) {
    let question;
    switch(type) {
      case 'checkbox': {
        question = new Checkbox();
        question.addChoice('Option 1');
        question.addChoice('Option 2');
        break;
      }

      case 'rating': {
        break;
      }

      case 'text': {
        question = new TextElement();
        break;
      }

      case 'radiogroup': {
        question = new Radiogroup();
        question.addChoice('Option 1');
        question.addChoice('Option 2');
        break;
      }

      default: {
        throw new Error('The question type that was provided is invalid');
      }
    }
    question.name = 'question' + (this.elements.length + 1);
    this.elements.push(question);
  }

  public removeQuestion(index: number) {
    console.log('Removing element at index ' + index);
    this.elements.splice(index, 1);
  }

  public debug() {
    console.log(this.model);
    console.log(this.elements);
  }

  public createSurvey() {
    this.surveyService.create(this.model).subscribe((res) => {
      this.refreshData();
    })
  }

  public refreshData() {
    this.surveyService.getData().subscribe(res => {
      this.surveys = res;
    },
    (err) => {
      console.log('Something went wrong connecting to the database');
      console.log(err);
    });
  }

  public deleteSurvey(index: number) {
    console.log('Index is ' + index);
    var survey = this.surveys[index];

    this.surveyService.delete(survey._id).subscribe(res => {
      if(res.status == 200) {
        this.refreshData();
      }
    },
    err => {
      if(err) {
        console.log(err);
        throw err;
      }
    })
  }

  public loadSurvey(index: number) {
    this.model = this.surveys[index];
    this.elements = this.model.pages[0].elements;
  }

  public toggleTable() {
    this.showTable = !this.showTable;
    this.refreshData();
  }

  public typeOf(value) {
    return typeof value;
  }
}
