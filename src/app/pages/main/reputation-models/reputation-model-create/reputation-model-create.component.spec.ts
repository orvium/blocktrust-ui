import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReputationModelCreateComponent } from './reputation-model-create.component';

describe('ReputationModelCreateComponent', () => {
  let component: ReputationModelCreateComponent;
  let fixture: ComponentFixture<ReputationModelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReputationModelCreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReputationModelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
