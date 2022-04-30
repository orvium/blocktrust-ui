import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputationModelsComponent } from './reputation-models.component';

describe('ReputationModelsComponent', () => {
  let component: ReputationModelsComponent;
  let fixture: ComponentFixture<ReputationModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReputationModelsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReputationModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
