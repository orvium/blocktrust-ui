import { CustomDialogComponent } from './custom-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogsModule } from '../dialogs.module';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('CustomDialogComponent', () => {

  beforeEach(() => {
    return MockBuilder(CustomDialogComponent, DialogsModule)
      .mock(MatDialogRef, {
        close: jasmine.createSpy().and.returnValue(of())
      });
  });

  it('should create', () => {
    const fixture = MockRender(CustomDialogComponent);
    expect(fixture.point.componentInstance).toBeDefined();
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should close the dialog', () => {
    const fixture = MockRender(CustomDialogComponent);
    const service = fixture.point.injector.get(MatDialogRef);
    fixture.componentInstance.confirm();
    expect(service.close).toHaveBeenCalledWith(true);
    fixture.componentInstance.cancel();
    expect(service.close).toHaveBeenCalledWith(false);
  });
});
