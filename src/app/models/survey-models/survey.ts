import { Page } from './page';
import { IElement } from './IElement';

export class ModelSurvey {
  title: string;
  showProgression: string;
  progressBarType: string;
  mode: string;
  questionsOnPageMode: string;
  pages: Page[];

  public constructor() {
    this.title = "The title of the survey goes here";
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