import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnDevInfoComponent } from './sn-dev-info.component';

describe('SnDevInfoComponent', () => {
  let component: SnDevInfoComponent;
  let fixture: ComponentFixture<SnDevInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnDevInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnDevInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
