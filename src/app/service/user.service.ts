import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public authenticate(login) {
    return this.http.post("http://localhost:9091/authenticate", login)
  }
  
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }

  isUserAuthenticated() {
    return sessionStorage.getItem("token") != null;
  }
}
