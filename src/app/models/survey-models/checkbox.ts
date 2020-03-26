import { IElement } from './IElement';
import { TextElement } from './textelement';
import { Choice } from './choice';

export class Checkbox extends TextElement implements IElement {
  _id: string;
  type: string;  
  name: string;
  title: string;
  isRequired: boolean;
  /**
   * Objects are passed by reference, but strings are not. Passing the choices as choice objects
   * allows us to share data between components more easily. These will later be converted to strings
   * for the refChoices array, as the Survey model can only interpret strings.
   */
  refChoices: Choice[];
  /**
   * The Survey.Model() object only recognizes string[] as a valid input, but strings
   * are not passed by reference, which means that these values are significantly
   * harder to share between components.
   * 
   * We use refChoices[] to handle the form logic, then convert its values to choices[]
   * to pass into the Survey.Model() in the survey-view component.
   */
  choices: string[];
  hasSelectAll: boolean;
  hasNone: boolean;
  description: string;
  
  public constructor() {
    super();
    this.refChoices = [];
    this.choices = [];
    this.hasNone = false;
    this.hasSelectAll = false;
  }

  protected initialize() {
    this.type = "checkbox";
    console.log('Initializing ' + this.type);
  }

  public addChoice(choice: string) {
    let newChoice = new Choice(choice);
    this.refChoices.push(newChoice);
  }

  public removeChoice(choice: string) {
    let tempChoice = new Choice(choice);
    var index = this.refChoices.indexOf(tempChoice);
    
    if(index > -1) {
      this.refChoices.splice(index, 1);
    }
  }

  public removeChoiceByIndex(index: number) {
    if(index > -1) {
      this.refChoices.splice(index, 1);
      this.choices.splice(index, 1);
    }
  }

  /**
   * This method dumps all refChoice values (i.e. the string contained within each)
   * to the choices array, in order to make the values compatible with the 
   * Survey.Model() used by the SurveyJS API for creating the survey. 
   * @deprecated This method is no longer necessary, as it was causing too many bugs
   */
  public convertChoices() {
    for(let i = 0; i < this.refChoices.length; i++) {
      this.choices[i] = this.refChoices[i].choice;
    }
  }
}