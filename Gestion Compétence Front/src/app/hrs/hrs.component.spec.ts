import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrsComponent } from './hrs.component';

describe('HrsComponent', () => {
  let component: HrsComponent;
  let fixture: ComponentFixture<HrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrsComponent]
    });
    fixture = TestBed.createComponent(HrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
