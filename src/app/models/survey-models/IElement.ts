/**
 * This interface combines all fields common to each type of question in the context
 * of the SurveyJS API.
 * 
 * Most importantly, this allows all types of questions to be stored in the Page model's
 * elements array regardless of the question's type.
 * 
 * @author Frederic Joly
 */
export interface IElement {
  [x: string]: any;
  _id: string;
  type: string;
  name: string;
  isRequired: boolean;
  title: string;
  description: string;
}