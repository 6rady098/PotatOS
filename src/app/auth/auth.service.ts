import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/users/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  updateToken(id: string) {
    this.http
      .get(BACKEND_URL + 'updateToken/' + id)
      .subscribe(
        res => {
          const token = JSON.stringify(res);
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAuthData(token);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(username: string, password: string) {
    this.http
      .post(BACKEND_URL + 'login', {username, password})
      .subscribe(
        res => {
         // const token = JSON.stringify(res['token']) 
          const token = JSON.stringify(res);
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAuthData(token);
            const user = JSON.parse(token);
            if (user.role === 1) {
              this.router.navigate(['/available-studies']);
            } else {
              this.router.navigate(['/profile']);
            }
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.loggedInUser;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string) {
    sessionStorage.setItem('loggedInUser', token);
  }

  private clearAuthData() {
    sessionStorage.removeItem('loggedInUser');
  }

  private getAuthData() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      return;
    }
    return {
      loggedInUser
    };
  }
}
