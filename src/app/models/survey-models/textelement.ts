import { IElement } from './IElement';

export class TextElement implements IElement {
  [x: string]: any;
  _id: string;
  type: string;  
  name: string;
  isRequired: boolean;
  title: string;
  description: string;

  public constructor() {
    this.name = "question";
    this.description = ""
    this.title = ""
    this.isRequired = false;
    this.initialize();
  }

  /**
   * This method handles parts of the initialization that must be
   * overriden by each subclass.
   * 
   * For example, a Checkbox object would not want to have the "text"
   * type, so it will instead override this method to set a different type.
   */
  protected initialize() {
    this.type = "text";
    console.log('Initializing ' + this.type);
  }
}