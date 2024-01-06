import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationComponent } from './add-evaluation.component';

describe('AddEvaluationComponent', () => {
  let component: AddEvaluationComponent;
  let fixture: ComponentFixture<AddEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEvaluationComponent]
    });
    fixture = TestBed.createComponent(AddEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
