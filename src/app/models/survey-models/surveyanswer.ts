/**
 * This class models a set of answers to each question on a given
 * survey by a given user.
 * 
 * @author Frederic Joly
 */
export class SurveyAnswer {
  user_id: string;
  survey_id: string;
  responses: any[];

  constructor() {
    this.responses = [];
  }
}