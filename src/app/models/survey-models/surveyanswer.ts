/**
 * This class models a set of answers to each question on a given
 * survey by a given user.
 * 
 * @author Frederic Joly
 */
export class SurveyAnswer {
  username: string;
  survey_id: string;

  /**
   * This object will have one field for each question that was on the survey.
   * 
   * If the question was of type "Text" or "Radiogroup", those fields will be strings.
   * If the question was of type "Checkbox", it will be an array of strings, one string for each selected answer. 
   */
  responses: any;

  constructor() {
    this.responses = [];
  }
}