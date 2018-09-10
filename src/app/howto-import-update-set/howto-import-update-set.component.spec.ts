import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoImportUpdateSetComponent } from './howto-import-update-set.component';

describe('HowtoImportUpdateSetComponent', () => {
  let component: HowtoImportUpdateSetComponent;
  let fixture: ComponentFixture<HowtoImportUpdateSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoImportUpdateSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoImportUpdateSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
