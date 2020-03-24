/**
 * The SurveyJS API requires an array of strings for its radiogroup and checkbox questions,
 * but using a string array directly results in bugs when trying to edit their value in the form.
 * 
 * This object acts as a wrapper to allow us to pass each choice between components.
 * @author Frederic Joly
 */
export class Choice {
  _id: string;
  choice: string;

  public constructor(choice: string) {
    this.choice = choice;
  }
}