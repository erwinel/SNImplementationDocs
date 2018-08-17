import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnApplicationDetailComponent } from './sn-application-detail.component';

describe('SnApplicationDetailComponent', () => {
  let component: SnApplicationDetailComponent;
  let fixture: ComponentFixture<SnApplicationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnApplicationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
