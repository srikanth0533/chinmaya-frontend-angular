import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertficateLinkComponent } from './certficate-link.component';

describe('CertficateLinkComponent', () => {
  let component: CertficateLinkComponent;
  let fixture: ComponentFixture<CertficateLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertficateLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertficateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
