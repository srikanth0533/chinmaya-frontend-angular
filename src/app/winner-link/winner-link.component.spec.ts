import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerLinkComponent } from './winner-link.component';

describe('WinnerLinkComponent', () => {
  let component: WinnerLinkComponent;
  let fixture: ComponentFixture<WinnerLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
