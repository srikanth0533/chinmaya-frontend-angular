import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteStatsComponent } from './website-stats.component';

describe('WebsiteStatsComponent', () => {
  let component: WebsiteStatsComponent;
  let fixture: ComponentFixture<WebsiteStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
