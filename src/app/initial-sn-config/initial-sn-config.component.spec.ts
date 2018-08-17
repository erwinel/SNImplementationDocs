import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSnConfigComponent } from './initial-sn-config.component';

describe('InitialSnConfigComponent', () => {
  let component: InitialSnConfigComponent;
  let fixture: ComponentFixture<InitialSnConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialSnConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSnConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
