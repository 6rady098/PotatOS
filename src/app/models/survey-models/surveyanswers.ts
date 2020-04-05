
export class SurveyAnswers {
  user_id: string;
  survey_id: string;
  responses: [
    {
      questionName: string,
      response: any;
    }
  ]
}