import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import * as Survey from 'survey-angular';
import { ModelSurvey } from '../../../models/survey-models/survey';
import { InitPageComponent } from '../../init-page.component';
import { Checkbox } from 'src/app/models/survey-models/checkbox';
import { Radiogroup } from 'src/app/models/survey-models/radiogroup';

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
    this.convertChoices(template);
    var model = new Survey.Model(template);
    model.onComplete
      .add((results) => {
        console.log(results.data);
        console.log(results.data.question3);
      });

    Survey.StylesManager.applyTheme("bootstrap");
    Survey.SurveyNG.render("surveyElement", {
      model: model,
      isExpanded: true
    })

  }

  /**
 * This method is necesssary in order to convert the Choice object array into an array of strings.
 * The Choice objects are necessary to pass data between the components (else the data won't update correctly),
 * but the survey API can only interpret a string array. This step prepares the string array to be read
 * by the survey API. 
 */
  public convertChoices(template: ModelSurvey) {
    var elements = template.pages[0].elements;
    console.log('convertChoices: printing elements array');
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {

      if (elements[i].type === 'checkbox' || elements[i].type === 'radiogroup') {
        
        var choices = elements[i].choices;
        var refChoices = elements[i].refChoices;

        for(let i = 0; i < refChoices.length; i++) {
          choices[i] = refChoices[i].choice;
        }
      }
    }
  }
}
