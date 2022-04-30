import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { EthereumService } from '../../../blockchain/ethereum.service';
import { OrvDialogService } from '../dialogs/orv-dialog.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { SnackBarService } from 'src/app/core/services/snack-bar/snack-bar.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('installMetaMaskDialogTemplate') installMetaMaskDialogTemplate!: TemplateRef<unknown>;
  ethereumIsEnabled = false;

  constructor(
    public userService: UserService,
    private router: Router,
    public oidcSecurityService: OidcSecurityService,
    public ethereumService: EthereumService,
    private snackService: SnackBarService,
    public dialogService: OrvDialogService,
  ) {
  }

  public logoutOauth(): void {
    this.oidcSecurityService.logoff();
    this.oidcSecurityService.logoffLocal();
    this.router.navigate(['/login']);
  }

  switchBlockchain($event: MatSlideToggleChange): void {
    if (this.ethereumService.isAvailable.value) {
      if (!this.ethereumIsEnabled) {
        this.ethereumService.init().then(value => {
          this.ethereumIsEnabled = value;
          if (value) {
            this.snackService.openSnackBar(`Connected to Ethereum network`, 'Hide');
          }
        });

      } else {
        this.ethereumService.close();
        this.ethereumIsEnabled = false;
        this.snackService.openSnackBar('Disconnected', 'Hide');
      }
    } else {
      $event.source.checked = false;
      this.dialogService.openCustom({
        template: this.installMetaMaskDialogTemplate,
        showActionButtons: false,
      });
    }
  }
}
