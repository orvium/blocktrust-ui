import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputationModelEditComponent } from './reputation-model-edit.component';

describe('ReputationModelEditComponent', () => {
  let component: ReputationModelEditComponent;
  let fixture: ComponentFixture<ReputationModelEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReputationModelEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReputationModelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
