import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCodeSnippetsComponent } from './server-code-snippets.component';

describe('ServerCodeSnippetsComponent', () => {
  let component: ServerCodeSnippetsComponent;
  let fixture: ComponentFixture<ServerCodeSnippetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerCodeSnippetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerCodeSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
