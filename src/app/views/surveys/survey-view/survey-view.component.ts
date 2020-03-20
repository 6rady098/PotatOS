import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import * as Survey from 'survey-angular';
import { ModelSurvey } from '../../../models/survey-models/survey';
import { InitPageComponent } from '../../init-page.component';

@Component({
  selector: 'survey-view',
  template: `<div id="surveyElement"></div>`
  //styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent extends InitPageComponent implements OnInit {

  @Input() template: ModelSurvey;

  constructor() {
    super();
  }
  
  ngOnInit() {
    this.render(this.template);
  }

  public render(template: ModelSurvey) {

    var model = new Survey.Model(template);
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
