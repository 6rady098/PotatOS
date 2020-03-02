import { IElement } from './IElement';

export class Checkbox implements IElement {
  type: string;  
  name: string;
  isRequired: boolean;
  choices: string[];
  hasSelectAll: boolean;
  hasNone: boolean;
  
  public constructor() {
    this.type = "checkbox";
    this.name = "Checkbox default name";
    this.isRequired = false;
    this.choices = [];
    this.hasNone = false;
    this.hasSelectAll = false;
  }

  public addChoice(choice: string) {
    this.choices.push(choice);
  }

  public removeChoice(choice: string) {
    
    var index = this.choices.indexOf(choice);
    
    if(index > -1) {
      console.log('Removing choice at index ' + index);
      console.log(this.choices.splice(index, 1));
    }
  }
}