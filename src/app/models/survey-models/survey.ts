import { Page } from './page';
import { IElement } from './IElement';

export class ModelSurvey {
  title: string;
  showProgression: string;
  mode: string;
  questionsOnPageMode: string;
  pages: Page[];
  page: Page;

  public constructor() {
    this.title = "";
    this.showProgression = "top";
    this.mode = "display";
    this.questionsOnPageMode = "singlePage";
    this.pages = [new Page()];
    this.page = this.pages[0];
  }

  public addPage(page: Page) {
    this.pages.push(page);
  }

  public popPage() {
    this.pages.pop();
  }

  public getElements(): IElement[] {
    return this.pages[0].elements;
  }
}