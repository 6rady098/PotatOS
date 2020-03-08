import { Checkbox } from './checkbox';
import { IElement } from './IElement';
import { ɵMetadataOverrider } from '@angular/core/testing';


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