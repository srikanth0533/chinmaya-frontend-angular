import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionLinkComponent } from './session-link.component';

describe('SessionLinkComponent', () => {
  let component: SessionLinkComponent;
  let fixture: ComponentFixture<SessionLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
