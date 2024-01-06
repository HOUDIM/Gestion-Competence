import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHrComponent } from './update-hr.component';

describe('UpdateHrComponent', () => {
  let component: UpdateHrComponent;
  let fixture: ComponentFixture<UpdateHrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHrComponent]
    });
    fixture = TestBed.createComponent(UpdateHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
