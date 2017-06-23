import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any = null;
  isAnthenticated = false;
  welcomeMessage = '';

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }


  login(formData) {
    this._authService.login(formData)
                     .subscribe(
                       data => this.handleLoginSuccess(data),
                       error => this.handleLoginFailure(error)
                     )
  }

  handleLoginSuccess(data) {
    console.log('success', data);
    this.loginData = data;
    this.isAnthenticated = true;
    this.welcomeMessage = 'Bienvenue';
    localStorage.setItem('login-data', JSON.stringify(data));

  }

  handleLoginFailure(data) {
    console.log('failure', data);
  }
}
