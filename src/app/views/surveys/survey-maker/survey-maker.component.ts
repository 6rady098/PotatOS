
/**
 * This component is used to edit a survey.
 * 
 * @author Frederic Joly
 */
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModelSurvey } from '../../../models/survey-models/survey';
import { Checkbox } from '../../../models/survey-models/checkbox';
import { IElement } from 'src/app/models/survey-models/IElement';
import { Radiogroup } from 'src/app/models/survey-models/radiogroup';
import { TextElement } from 'src/app/models/survey-models/textelement';
import { SurveyService } from 'src/app/services/survey.service';
import { InitPageComponent } from '../../init-page.component';

@Component({
  selector: 'survey-maker',
  templateUrl: './survey-maker.component.html',
  styleUrls: ['./survey-maker.component.css']
})
export class SurveyMakerComponent extends InitPageComponent implements OnInit {

  public readonly navigationBarPositions = ['top', 'bottom', 'both'];
  public readonly elementTypes = ['text', 'checkbox', 'radiogroup'/*, 'dropdown', 'comment', 'boolean', 'rating'*/];
  private readonly pageMode = 'singlePage';
  showDebug = false;
  questionType: string;
  @Input() model: ModelSurvey;
  elements: IElement[];
  showSurvey: boolean;
  surveys: ModelSurvey[];
  displayedColumns = ['title', 'elements', 'options'];
  showTable = false;

  constructor(
    private surveyService: SurveyService
  ) {
    super();
  }

  ngOnInit() {
    this.initialize();
  }

  /**
   * This function initializes many of the component's fields to their default values
   */
  private initialize() {
    this.showSurvey = true;

    if (this.model == null) {
      console.log("Initializing survey-maker model to default");
      this.model = new ModelSurvey();
    }

    this.elements = this.model.pages[0].elements;
    this.model.progressBarType = "questions";
    this.questionType = "";
    this.model.mode = 'display';
    this.refreshData();
  }

  /**
   * This function adds a question to the survey based on the input.
   * @param type Is a string that determines the type of question that will be added.
   */
  public addQuestion(type: string) {
    let question;
    switch (type) {
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

  /**
   * Removes an element from the survey model's elements array.
   * @param index The index of the question that needs to be removed.
   */
  public removeQuestion(index: number) {
    console.log('Removing element at index ' + index);
    this.elements.splice(index, 1);
  }

  /**
   * Used to log information to the console. Can be assigned to a button (click) event
   * for debugging.
   */
  public debug() {
    console.log(this.model);
    console.log(this.elements);
  }

  /**
   * @deprecated
   */
  public createSurvey() {
    this.surveyService.create(this.model).subscribe((res) => {
      this.refreshData();
    })
  }

  /**
   * @deprecated
   */
  public refreshData() {
    this.surveyService.getData().subscribe(res => {
      this.surveys = res;
    },
      (err) => {
        console.log('Something went wrong connecting to the database');
        console.log(err);
      });
  }

  /**
   * This function updates the current survey's database entry.
   */
  public async updateSurvey() {
    await new Promise((resolve, reject) => {
      this.surveyService.update(this.model, this.model._id).subscribe(
        res => {
          if (res.status === 200) {
            console.log('Update successful');
            resolve('Success');
          }
        },

        err => {
          if (err) {
            reject(err);
          }
        });
    });
  }

  /**
   * This function was initially used to delete surveys from a list retrieved from the database.
   * This functionality has since changed now that surveys are now tied to studies, and are only
   * retrieved individually.
   * @deprecated 
   */
 /*
  public deleteSurvey(index: number) {
    console.log('Index is ' + index);
    var survey = this.surveys[index];

    this.surveyService.delete(survey._id).subscribe(res => {
      if (res.status == 200) {
        this.refreshData();
      }
    },
      err => {
        if (err) {
          console.log(err);
          throw err;
        }
      })
  }
*/

  /**
   * This function was initially written to load a survey from a list of surveys. This function
   * is no longer used, as surveys are now retrieved individually from a different component.
   * @param index 
   * @deprecated
   */
  public loadSurvey(index: number) {
    this.model = this.surveys[index];
    this.elements = this.model.pages[0].elements;
  }

  public toggleTable() {
    this.showTable = !this.showTable;
    this.refreshData();
  }

  /**
   * This function returns the value of the typeof operator for a given variable.
   * @param value An object whose type needs to be determined.
   */
  public typeOf(value) {
    return typeof value;
  }

  /**
   * This function resets the active survey to default values
   * 
   * @return a Promise that resolves if the survey is successfully updated
   */
  public async resetSurvey() {
    //We save the _id, as the re-initialization won't keep the current id, and we'll lose the relationship
    let id = this.model._id;

    //We nullify the model, as it allows the initialize() method to reset the model
    this.model = null;
    this.initialize();
    this.model._id = id;

    await new Promise((resolve, reject) => {
      this.updateSurvey()
        .then(result => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}