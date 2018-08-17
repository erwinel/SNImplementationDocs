import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSetsComponent } from './update-sets.component';

describe('UpdateSetsComponent', () => {
  let component: UpdateSetsComponent;
  let fixture: ComponentFixture<UpdateSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
