/**
 * This class models questions that correspond to the SurveyJS questions of type "radiogroup"
 * 
 * @author Frederic Joly
 */
import { Checkbox } from './checkbox';
import { IElement } from './IElement';

export class Radiogroup extends Checkbox implements IElement {
  
  public constructor() {
    super();
  }

  protected initialize() {
    this.type = "radiogroup";
    console.log('Initializing ' + this.type);
    this.hasNone = false;
    this.hasSelectAll = false;
  }
}