/**
 * This models the SurveyJS PageModel, but more simplified. In the current
 * implementation, each survey only has a single page in order to keep the 
 * form and functionality simple.
 * 
 * @author Frederic Joly
 */
import { IElement } from './IElement';

export class Page {
  _id: string;
  name: string;
  elements: IElement[];

  public constructor() {
    this.name = "";
    this.elements = [];
  }

  public addElement(element: IElement) {
    this.elements.push(element);
  }

  public removeElement(element: IElement) {
    var index = this.getElementIndex(element);

    if(index > -1) {
      console.log('Removing element at index ' + index);
      console.log(this.elements.splice(index, 1));
    }    
  }

  public getElementIndex(element: IElement): number {

    var elementString = JSON.stringify(element);
    for(let i = 0; i < this.elements.length; i++) {
      var compareString = JSON.stringify(this.elements[i]);
      if(elementString === compareString)
        return i;
    }

    return -1;
  }
}