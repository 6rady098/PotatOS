import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SurveyAnswer } from '../models/survey-models/surveyanswer';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/surveyanswer/';
@Injectable({
  providedIn: 'root'
})
export class SurveyanswerService {

  constructor(private http: HttpClient) { }

  create(data: SurveyAnswer) {
    return this.http.post(BACKEND_URL, data, {observe: 'response'});
  }

  update(data: SurveyAnswer, id: string) {
    return this.http.put(BACKEND_URL + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete(BACKEND_URL + id, {observe: 'response'});
  }

  getData(): Observable<SurveyAnswer[]> {
    return this.http.get<SurveyAnswer[]>(BACKEND_URL);
  }
  
  getAnswerById(_id: string): Observable<any> {
    return this.http.get<any>(BACKEND_URL + _id, {observe: 'response'});
  }

  //TODO: fix the SurveyAnswerController, we didn't have time to figure out how to query an object by something other than its _id
  getAnswerByUserId(username: string): Observable<any> {
    return this.http.get<any>(BACKEND_URL + 'user/' + username, {observe: 'response'});
  }

  //TODO: fix the SurveyAnswerController, we didn't have time to figure out how to query an object by something other than its _id
  getAnswerBySurveyId(survey_id: string): Observable<any> {
    return this.http.get<any>(BACKEND_URL + 'survey/' + survey_id, {observe: 'response'});
  }
}
