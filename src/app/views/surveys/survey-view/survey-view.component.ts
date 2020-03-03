import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as Survey from 'survey-angular';
import { ModelSurvey } from '../../../models/survey-models/survey';

@Component({
  selector: 'survey-view',
  template: `<div id="surveyElement"></div>`
  //styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit, OnChanges {

  @Input()
  template: ModelSurvey;

  model: Survey.Model;

  constructor() {
    console.log('Survey-View OnInit() called');
    
  }
  
  ngOnInit() {
    this.model = new Survey.Model(this.template);
    Survey.StylesManager.applyTheme("bootstrap");
    Survey.SurveyNG.render("surveyElement", {
      model: this.model,
      isExpanded: true
    });
  }

  ngOnChanges() {
    
  }
}
