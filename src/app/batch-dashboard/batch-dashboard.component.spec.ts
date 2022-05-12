import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDashboardComponent } from './batch-dashboard.component';

describe('BatchDashboardComponent', () => {
  let component: BatchDashboardComponent;
  let fixture: ComponentFixture<BatchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
