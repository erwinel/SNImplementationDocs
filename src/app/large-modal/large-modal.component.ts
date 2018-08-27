import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface ILargeModalBodyText {
  type: 'text';
  text: string;
  bold?: boolean;
}
function isLargeModalBodyText(value: LargeModalBodyContent): value is ILargeModalBodyText {
  return value.type === 'text';
}
export interface ILargeModalBodyParagraph {
  type: 'p';
  content: string|ILargeModalBodyText|ILargeModalBodyFigure|(string|ILargeModalBodyText|ILargeModalBodyFigure)[];
}
function isLargeModalBodyParagraph(value: LargeModalBodyContent): value is ILargeModalBodyParagraph {
  return value.type === 'p';
}
export interface ILargeModalBodyFigure {
  type: 'figure';
  src: string;
  alt: string;
}
function isLargeModalBodyFigure(value: LargeModalBodyContent): value is ILargeModalBodyFigure {
  return value.type === 'figure';
}
export type LargeModalBodyContent = ILargeModalBodyText|ILargeModalBodyParagraph|ILargeModalBodyFigure;

function importLargeModalBodyContent(value: string|LargeModalBodyContent|(string|LargeModalBodyContent)[]): LargeModalBodyContent[] {
  if (typeof(value) === 'string')
    return [{ type: 'text', text: value }];
  if (Array.isArray(value))
    return value.map<LargeModalBodyContent>(function(v: string|LargeModalBodyContent): LargeModalBodyContent {
      if (typeof(v) === 'string')
        return { type: 'text', text: v };
      if (isLargeModalBodyParagraph(v))
        return {
          type: 'p',
          content: <(ILargeModalBodyText|ILargeModalBodyFigure)[]>(importLargeModalBodyContent(v.content))
        };
      return v;
    });
  if (isLargeModalBodyParagraph(value))
    return [{
      type: 'p',
      content: <(ILargeModalBodyText|ILargeModalBodyFigure)[]>(importLargeModalBodyContent(value.content))
    }];
  return [value];
}
@Component({
  selector: 'app-large-modal',
  templateUrl: './large-modal.component.html',
  styleUrls: ['./large-modal.component.css']
})
export class LargeModalComponent {
  private _content: LargeModalBodyContent[] = [];
  @Input() titleText: string;
  get content() { return this._content; }
  @Input() set content (value: string|LargeModalBodyContent|(string|LargeModalBodyContent)[]) {
    this._content = importLargeModalBodyContent(value);
  }

  constructor(public activeModal: NgbActiveModal) {}
  closeResult: string;

}
