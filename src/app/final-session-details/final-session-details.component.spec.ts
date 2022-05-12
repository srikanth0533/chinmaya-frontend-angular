import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSessionDetailsComponent } from './final-session-details.component';

describe('FinalSessionDetailsComponent', () => {
  let component: FinalSessionDetailsComponent;
  let fixture: ComponentFixture<FinalSessionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalSessionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
