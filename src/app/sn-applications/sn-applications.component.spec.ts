import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnApplicationsComponent } from './sn-applications.component';

describe('SnApplicationsComponent', () => {
  let component: SnApplicationsComponent;
  let fixture: ComponentFixture<SnApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
