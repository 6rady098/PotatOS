import { Component, OnInit, Input } from '@angular/core';
import * as Survey from 'survey-angular';
import { ModelSurvey } from '../../../models/survey-models/survey';

@Component({
  selector: 'survey-view',
  template: `<div id="surveyElement"></div>`
  //styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {

  @Input()
  template: ModelSurvey;
  model: Survey.Model;

  constructor() {
    
  }
  
  ngOnInit() {
    
    this.model = new Survey.Model(this.template);

    console.log(this.model);

    Survey.StylesManager.applyTheme("bootstrap");
    Survey.SurveyNG.render("surveyElement", {
      model: this.model,
      isExpanded: true
    });
  }

}
