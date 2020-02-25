import { Component, OnInit, ViewChild } from '@angular/core';
import * as Survey from 'survey-angular';
import * as PageModel from 'survey-angular';
import { SurveyViewComponent } from '../survey-view/survey-view.component';

//@ViewChild(SurveyViewComponent, null)
@Component({
  selector: 'app-survey-maker',
  templateUrl: './survey-maker.component.html',
  styleUrls: ['./survey-maker.component.css']
})
export class SurveyMakerComponent implements OnInit {

  public json: Survey.Model;
  public readonly navigationBarPositions = [ 'none', 'top', 'bottom', 'both' ];
  public readonly elementTypes = [ 'text', 'checkbox', 'radiogroup', 'dropdown', 'comment', 'boolean', 'rating' ];
  public showDebug = false;
  public JSONstring: string;

  constructor() {
    this.initialize();
  }

  ngOnInit() {
    
  }

  private initialize() {
    this.json = new Survey.Model();
    this.addPage();
    this.json.showProgressBar = "none";
    this.json.questionsOnPageMode = "standard";
    //this.json.pages.push(new Survey.PageModel());
    this.json.mode = "display";

  }

  public addPage() {
    this.json.pages.push(new Survey.PageModel());
    this.addQuestion(0);
    this.printPages();
  }

  public removePage() {
    if(this.json.pages.length > 1){
      this.json.pages.pop();
      this.printPages();
    }
  }

  private printPages() {
    console.log("There are " + this.json.pages.length + " pages in the array");
  }

  private printElements(index: number) {
    console.log("There are " + this.json.pages[index].elements.length + " elements in the page");
  }

  public addQuestion(index: number) {
    var i = this.json.pages[index].elements.length + 1;
    this.json.pages[index].elements.push(new Survey.Question('question ' + (index + 1)));
    this.printElements(index);
  }

  public removeQuestion(index: number) {

    if(this.json.pages[index].elements.length > 1) {
      this.json.pages[index].elements.pop();
      this.printElements(index);
    }
  }

  public debug() {
    var message = "showProgressBar value = " + this.json.showProgressBar;
    alert(message);
  }
}
