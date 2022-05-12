import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerCertificateComponent } from './winner-certificate.component';

describe('WinnerCertificateComponent', () => {
  let component: WinnerCertificateComponent;
  let fixture: ComponentFixture<WinnerCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
