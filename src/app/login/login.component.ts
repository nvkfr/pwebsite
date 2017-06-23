import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any = null;
  isAuthenticated = false;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('login-data')) {
      this.refreshFlags();
    }
  }

  refreshFlags() {
    this.isAuthenticated = true;
    const link = ['/blog'];
    this._router.navigate( link );
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
    this.refreshFlags();
    localStorage.setItem('login-data', JSON.stringify(data));
  }

  handleLoginFailure(data) {
    console.log('failure', data);
  }
}
