import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotDashboardComponent } from './slot-dashboard.component';

describe('SlotDashboardComponent', () => {
  let component: SlotDashboardComponent;
  let fixture: ComponentFixture<SlotDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
