import { Component, OnInit, ViewChild } from '@angular/core';
import { ModelSurvey } from '../../../models/survey-models/survey';
import { Checkbox } from '../../../models/survey-models/checkbox';
import { IElement } from 'src/app/models/survey-models/IElement';
import { Page } from 'src/app/models/survey-models/page';

@Component({
  selector: 'app-survey-maker',
  templateUrl: './survey-maker.component.html',
  styleUrls: ['./survey-maker.component.css']
})
export class SurveyMakerComponent implements OnInit {

  public readonly navigationBarPositions = [ 'none', 'top', 'bottom', 'both' ];
  public readonly elementTypes = [ 'text', 'checkbox', 'radiogroup', 'dropdown', 'comment', 'boolean', 'rating' ];
  private readonly pageMode = 'singlePage';
  showDebug = true;
  questionType: string;
  model: ModelSurvey;
  pages: Page[];
  elements: IElement[];

  constructor() {
    this.initialize();
  }

  ngOnInit() {
    
  }

  private initialize() {
    this.model = new ModelSurvey();
    this.pages = this.model.pages;
    this.elements = this.pages[0].elements;
    this.questionType = "";

    this.model.title = "Test Survey: Answer the damn questions!";
    var question = new Checkbox();
    question.name = "Is this damn survey working?";
    question.addChoice("Yes");
    question.addChoice("No");
    question.hasSelectAll = true;
    question.hasNone = true;

    this.elements.push(question);

    console.log(this.model);
  }

  public addQuestion(type: string) {
    switch(type) {
      case "checkbox": {
        break;
      }

      case "rating": {

      }

      default: {
        throw new Error('The question type that was provided is invalid');
      }
    }
  }

  public debug() {
    alert(this.model.title);
  }
}
