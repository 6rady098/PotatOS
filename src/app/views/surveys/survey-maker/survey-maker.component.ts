import { Component, OnInit, ViewChild } from '@angular/core';
import * as Survey from 'survey-angular';
import * as PageModel from 'survey-angular';
import { SurveyViewComponent } from '../survey-view/survey-view.component';

@Component({
  selector: 'app-survey-maker',
  templateUrl: './survey-maker.component.html',
  styleUrls: ['./survey-maker.component.css']
})
export class SurveyMakerComponent implements OnInit {

  public json: Survey.Model;
  public readonly navigationBarPositions = [ 'none', 'top', 'bottom', 'both' ];
  public readonly elementTypes = [ 'text', 'checkbox', 'radiogroup', 'dropdown', 'comment', 'boolean', 'rating' ];
  private readonly pageMode = 'singlePage';
  public showDebug = true;
  public JSONstring: string;
  public questionType: string;

  constructor() {
    this.initialize();
  }

  ngOnInit() {
    
  }

  private initialize() {
    this.json = new Survey.Model();
    this.json.showProgressBar = "none";
    this.json.questionsOnPageMode = this.pageMode;
    //this.json.pages.push(new Survey.PageModel());
    this.json.mode = "display";

  }

  private printPages() {
    console.log("There are " + this.json.pages.length + " pages in the array");
  }

  private printElements() {
    console.log("There are " + this.json.pages[0].elements.length + " elements in the page");
  }

  public addQuestion(type: string) {

    switch(type) {
      case 'checkbox': {
        this.pushPageElement(new Survey.QuestionCheckboxModel('Checkbox Question'), 0);
        break;
      }
      case 'text': {
        this.pushPageElement(new Survey.QuestionTextModel('Text Question'), 0);
        break;
      }
      case 'radiogroup': {
        this.pushPageElement(new Survey.QuestionRadiogroupModel('Radiogroup Question'), 0);
        break;
      }
      case 'dropdown': {
        this.pushPageElement(new Survey.QuestionDropdownModel('Dropdown Question'), 0);
        break;
      }
      case 'comment': {
        this.pushPageElement(new Survey.QuestionCommentModel('Comment Question'), 0);
        break;
      }
      case 'boolean': {
        this.pushPageElement(new Survey.QuestionBooleanModel('Boolean Question'), 0);
        break;
      }
      case 'rating': {
        this.pushPageElement(new Survey.QuestionRatingModel('Rating Question'), 0);
        break;
      }
      default: {
        alert('You must select a question type');
      }
    }

    
  }

  private pushPageElement(question: Survey.Question, pageIndex: number) {
    this.json.pages[pageIndex].elements.push(question);
  }

  public removeQuestion(pageIndex: number) {
    if(this.json.pages[pageIndex].elements.length > 1) {
      this.json.pages[pageIndex].elements.pop();
    }
  }

  public debug() {
    alert(JSON.stringify(this.json));
  }
}
