import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth';

  constructor(private _http: Http) { }

  login (credentials) {
    return this._http.post(`${this.BASE_URL}/login`, credentials)
                     .map(res => res.json())
  }
}
