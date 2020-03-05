import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelSurvey } from '../models/survey-models/survey';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/questionnaires/';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  create(data: ModelSurvey) {
    return this.http.post(BACKEND_URL, data, {observe: 'response'});
  }

  update(data: ModelSurvey, id: string) {
    return this.http.put(BACKEND_URL + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete(BACKEND_URL + id, {observe: 'response'});
  }

  getData(): Observable<ModelSurvey[]> {
    return this.http.get<ModelSurvey[]>(BACKEND_URL);
  }
}
