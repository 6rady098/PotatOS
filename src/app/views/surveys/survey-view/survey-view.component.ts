import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import * as Survey from 'survey-angular';
import { ModelSurvey } from '../../../models/survey-models/survey';

@Component({
  selector: 'survey-view',
  template: `<div id="surveyElement"></div>`
  //styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {

  @Input() template: ModelSurvey;
  //model: Survey.Model;

  constructor() {
  }
  
  ngOnInit() {
    this.render(this.template);
  }

  public render(template: ModelSurvey) {

    let model = new Survey.Model(template);
    model.onComplete
      .add((results) => {
        console.log(results.data);
      });

    Survey.StylesManager.applyTheme("bootstrap");
    Survey.SurveyNG.render("surveyElement", {
      model: model,
      isExpanded: true
    })
    
  }
}
