import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';

export interface IDialogConfig extends MatDialogConfig {
  title?: string;
  content?: string;
  acceptMessage?: string;
  icon?: string;
}

export interface IConfirmConfig extends IDialogConfig {
  cancelMessage?: string;
  icon?: string;
}

export interface ICustomConfig extends IDialogConfig {
  showActionButtons: boolean;
  template: TemplateRef<any>;
  cancelMessage?: string;
}

export interface IInputConfig extends IDialogConfig {
  cancelMessage?: string;
  inputLabel?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrvDialogService {

  constructor(public _dialogService: MatDialog) {
  }

  public open<T>(component: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T> {
    return this._dialogService.open(component, config);
  }

  public closeAll(): void {
    this._dialogService.closeAll();
  }

  public openConfirm(config: IConfirmConfig): MatDialogRef<ConfirmDialogComponent, boolean> {
    const dialogConfig: MatDialogConfig = this._createConfig(config);
    const dialogRef: MatDialogRef<ConfirmDialogComponent, boolean> = this._dialogService.open(
      ConfirmDialogComponent,
      dialogConfig,
    );
    const confirmDialogComponent: ConfirmDialogComponent = dialogRef.componentInstance;
    confirmDialogComponent.title = config.title;
    confirmDialogComponent.content = config.content;
    confirmDialogComponent.icon = config.icon;

    if (config.cancelMessage) {
      confirmDialogComponent.cancelMessage = config.cancelMessage;
    }

    if (config.acceptMessage) {
      confirmDialogComponent.acceptMessage = config.acceptMessage;
    }
    return dialogRef;
  }

  public openCustom(config: ICustomConfig): MatDialogRef<CustomDialogComponent, boolean> {
    const dialogConfig: MatDialogConfig = this._createConfig(config);
    const dialogRef: MatDialogRef<CustomDialogComponent, boolean> = this._dialogService.open(
      CustomDialogComponent,
      dialogConfig,
    );
    const customDialogComponent: CustomDialogComponent = dialogRef.componentInstance;
    customDialogComponent.title = config.title;
    customDialogComponent.content = config.content;
    if (config.showActionButtons) {
      customDialogComponent.showActionButtons = config.showActionButtons;
      if (config.acceptMessage) {
        customDialogComponent.acceptMessage = config.acceptMessage;
      }
      if (config.cancelMessage) {
        customDialogComponent.cancelMessage = config.cancelMessage;
      }
      customDialogComponent.icon = config.icon;
    }
    customDialogComponent.template = config.template;

    return dialogRef;
  }

  private _createConfig(config: IDialogConfig): MatDialogConfig {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.width = 'max-content';
    Object.assign(dialogConfig, config);
    return dialogConfig;
  }
}
