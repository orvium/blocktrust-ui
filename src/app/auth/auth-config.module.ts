import { NgModule } from '@angular/core';
import { AbstractSecurityStorage, AuthInterceptor, AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorage } from './local-storage';


@NgModule({
  imports: [AuthModule.forRoot({
    config: {
      authority: environment.auth.authority,
      redirectUrl: 'http://localhost:4200/papers',
      postLogoutRedirectUri: 'http://localhost:4200',
      clientId: environment.auth.clientId,
      scope: 'openid profile offline_access',
      responseType: 'id_token token',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      logLevel: LogLevel.Debug,
      secureRoutes: [environment.apiEndpoint],
    }
  })],
  exports: [AuthModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: AbstractSecurityStorage, useClass: LocalStorage }
  ]
})
export class AuthConfigModule {
}
