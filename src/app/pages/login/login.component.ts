import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../shared/utils/functions';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public hide: boolean = true;
  public email: FormControl = new FormControl('user@gmail.com', [Validators.required, Validators.email]);
  public password: FormControl = new FormControl('', [Validators.required]);
  public getErrorMessage: Function;

  constructor(
    private router: Router,
    public oidcSecurityService: OidcSecurityService,
    public userService: UserService
  ) {
    this.getErrorMessage = getErrorMessage;
  }

  oauthLogin() {
    this.oidcSecurityService.authorize();
  }

  guessLogin() {
    this.userService.get({
      given_name: 'Jhon',
      family_name: 'Doe',
      name: 'Guess',
      id: 'guess-user',
      sub: 'guess-user'
    }).subscribe(user => {
      this.router.navigate(['/papers']);
    });
  }
}
