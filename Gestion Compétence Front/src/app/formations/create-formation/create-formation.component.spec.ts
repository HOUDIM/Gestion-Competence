import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormationComponent } from './create-formation.component';

describe('CreateFormationComponent', () => {
  let component: CreateFormationComponent;
  let fixture: ComponentFixture<CreateFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFormationComponent]
    });
    fixture = TestBed.createComponent(CreateFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
