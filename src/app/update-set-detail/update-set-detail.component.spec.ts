import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSetDetailComponent } from './update-set-detail.component';

describe('UpdateSetDetailComponent', () => {
  let component: UpdateSetDetailComponent;
  let fixture: ComponentFixture<UpdateSetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
