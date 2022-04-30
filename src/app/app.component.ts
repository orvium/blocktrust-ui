import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BlockchainService } from './blockchain/blockchain.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blocktrust-ui';

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private blockchainService: BlockchainService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.blockchainService.initNetworks();
    this.oidcSecurityService.checkAuth().subscribe(loginResponse => {
      console.log(loginResponse);
      this.userService.get(loginResponse.userData).subscribe();
    });
  }
}


