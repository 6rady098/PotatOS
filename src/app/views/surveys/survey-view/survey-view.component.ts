import { Component, OnInit, Input } from '@angular/core';
import * as Survey from 'survey-angular';

@Component({
  selector: 'survey-view',
  template: `<div id="surveyElement"></div>`
  //styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {

  @Input()
  json: any;

  @Input()
  model: Survey.Model;

  constructor() {
    
  }
  
  ngOnInit() {
    
    //this.model = new Survey.Model(this.json);

    Survey.StylesManager.applyTheme("bootstrap");
    Survey.SurveyNG.render("surveyElement", {
      model: this.model,
      isExpanded: true
    });
  }

}
