import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoImportApplicationComponent } from './howto-import-application.component';

describe('HowtoImportApplicationComponent', () => {
  let component: HowtoImportApplicationComponent;
  let fixture: ComponentFixture<HowtoImportApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoImportApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoImportApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
