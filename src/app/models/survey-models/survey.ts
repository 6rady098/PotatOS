/**
 * This is the model class for a survey. It corresponds to the SurveyJS model "SurveyModel".
 * The name was changed so as to avoid ambiguity with imports. 
 * 
 * @author Frederic Joly
 */
import { Page } from './page';
import { IElement } from './IElement';

export class ModelSurvey {
  public _id: string;
  title: string;
  showProgression: string;
  progressBarType: string;
  mode: string;
  questionsOnPageMode: string;
  pages: Page[];

  studyId: string;

  public constructor() {
    this.title = "Default Survey Title";
    this.showProgression = "top";
    this.progressBarType = "questions";
    this.mode = "display";
    this.questionsOnPageMode = "singlePage";
    this.pages = [new Page()];
  }

  public getElements(): IElement[] {
    return this.pages[0].elements;
  }
}