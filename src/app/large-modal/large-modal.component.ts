import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface IStringKeyedObject { [key: string]: any; }

/**
 * Represents text to be displayed within the modal dialog.
 *
 * @export
 * @interface IInputTextContent
 */
export interface IInputTextContent {
  /**
   * Text to be displayed within the modal dialog.
   *
   * @type {string}
   * @memberof IInputTextContent
   */
  text: string;

  /**
   * If true, then the text will be displayed as bold text.
   *
   * @type {boolean}
   * @memberof IInputTextContent
   */
  bold?: boolean;
}

/**
 * Represents text to be displayed within the modal dialog.
 *
 * @export
 * @interface ITemplateTextContent
 */
export interface ITemplateTextContent {
  /**
   * Indicates that this object represents text displayed within the modal dialog.
   *
   * @type {'text'}
   * @memberof ITemplateTextContent
   */
  type: 'text';

  /**
   * Text to be displayed within the modal dialog.
   *
   * @type {string}
   * @memberof ITemplateTextContent
   */
  text: string;

  /**
   * If true, then the text will be displayed as bold text.
   *
   * @type {boolean}
   * @memberof ITemplateTextContent
   */
  bold: boolean;
}

/**
 * Represents an image to be displayed as a figure.
 *
 * @export
 * @interface IInputFigure
 */
export interface IInputFigure {
  /**
   * Relative URL of image.
   *
   * @description If this is a relative URL, it will be relative to the application's base URL.
   * @type {string}
   * @memberof IInputFigure
   */
  src: string;

  /**
   * Alternative descriptive text for figure.
   *
   * @type {string}
   * @memberof IInputFigure
   */
  alt: string;
}

/**
 * Represents an image to be displayed as a figure.
 *
 * @export
 * @interface ITemplateFigure
 */
export interface ITemplateFigure {
  /**
   * Indicates that this object represents an image that is displayed as a figure.
   *
   * @type {'figure'}
   * @memberof ITemplateFigure
   */
  type: 'figure';

  /**
   * Relative URL of image.
   *
   * @description If this is a relative URL, it will be relative to the application's base URL.
   * @type {string}
   * @memberof ITemplateFigure
   */
  src: string;

  /**
   * Alternative descriptive text for figure.
   *
   * @type {string}
   * @memberof ITemplateFigure
   */
  alt: string;
}

/**
 * Intersection of input object types that can be nested inside paragraph tags.
 *
 * @description Paragraph content is to be included in the [input paragraph object's content property]{@link IInputParagraph#content}.
 * @typedef {(string|ITextContent|IFigureGraphic)} InputParagraphContent
 */
export type InputParagraphContent = string|IInputTextContent|IInputFigure;

/**
 * Intersection of object types used by this component's template which can be nested within a paragraph tags.
 *
 * @description Paragraph content will be included in the [template paragraph object's content property]{@link ITemplateParagraph#content}.
 * @typedef {(ITextContent|IFigureGraphic)} TemplateParagraphContent
 */
export type TemplateParagraphContent = ITemplateTextContent|ITemplateFigure;

/**
 * Represents component content input that that is nested within paragraph tags.
 *
 * @export
 * @interface IInputParagraph
 */
export interface IInputParagraph {
  /**
   * Indicates that this object represents content nested within paragraph tags.
   *
   * @type {'p'}
   * @memberof IInputParagraph
   */
  type: 'p';

  /**
   * Describes contents that are nested within paragraph tags.
   *
   * @type {(InputParagraphContent|InputParagraphContent[])}
   * @memberof IInputParagraph
   */
  content: InputParagraphContent|InputParagraphContent[];
}

/**
 * Represents component content referenced by the template that that is nested within paragraph tags.
 *
 * @export
 * @interface ITemplateParagraph
 */
export interface ITemplateParagraph {
  /**
   * Indicates that this object represents content nested within paragraph tags.
   *
   * @type {'p'}
   * @memberof ITemplateParagraph
   */
  type: 'p';

  /**
   * Describes contents that are nested within paragraph tags.
   *
   * @type {(TemplateParagraphContent[])}
   * @memberof ITemplateParagraph
   */
  content: TemplateParagraphContent[];
}

/**
 * Intersection of object types which can be provided as the content input of this component to specify modal dialog content.
 * @typedef {(string|ITextContent|IInputParagraph|IFigureGraphic)} InputContent
 */
export type InputContent = string|IInputTextContent|IInputParagraph|IInputFigure;

/**
 * Intersection of object types which can represent modal dialog content.
 * @typedef {(ITextContent|ITemplateParagraph|IFigureGraphic)} TemplateContent
 */
export type TemplateContent = ITemplateTextContent|ITemplateParagraph|ITemplateFigure;

/**
 * Determines whether an object represents a set of paragraph tags with nested content.
 *
 * @param {InputContent} value Object to test.
 * @returns {value is IInputParagraph} True if value represents a set of paragraph tags with nested content.
 */
function isInputParagraph(value: InputContent): value is IInputParagraph {
  return typeof(value) === 'object' && typeof((<IStringKeyedObject>value).type) === 'string' && (<IStringKeyedObject>value).type === 'p';
}

function isInputFigure(value: InputContent): value is IInputFigure {
  return typeof(value) === 'object' && typeof((<IStringKeyedObject>value).src) === 'string' &&
    typeof((<IStringKeyedObject>value).alt) === 'string';
}

/**
 * Transforms component content input to an object that can be used within this component's template.
 *
 * @param {(InputContent)} value - Component content input value(s).
 * @returns {TemplateContent} Object that can be used within this component's template.
 */
function importModalContent(value: InputContent): TemplateContent {
  if (isInputParagraph(value))
    return <ITemplateParagraph>{
      type: 'p',
      content: (Array.isArray(value.content)) ? value.content.map(importModalContent) : [importModalContent(value.content)]
    };
  if (isInputFigure(value))
    return <ITemplateFigure>{
      type: 'figure',
      src: value.src,
      alt: value.alt
    };
  if (typeof(value) === 'string')
    return <ITemplateTextContent>{ type: 'text', text: value, bold: false };
  return <ITemplateTextContent>{ type: 'text', text: value.text, bold: (typeof(value.bold) === 'boolean' && value.bold) };
}

/**
 * Component to show a modal popup with custom content.
 *
 * @export
 * @class LargeModalComponent
 */
@Component({
  selector: 'app-large-modal',
  templateUrl: './large-modal.component.html',
  styleUrls: ['./large-modal.component.css']
})
export class LargeModalComponent {
  private _templateContent: TemplateContent[] = [];

  /**
   * Title of modal popup.
   *
   * @memberof LargeModalComponent
   */
  @Input() titleText = '';

  /**
   * Sets the content for the modal popup.
   *
   * @type {(InputContent|InputContent[])}
   * @memberof LargeModalComponent
   */
  @Input() set content(value: InputContent|InputContent[]) {
    this._templateContent = (Array.isArray(value)) ? value.map(importModalContent) : [importModalContent(value)];
  }

  /**
   * Gets the objects used by the template to display the modal popup contents.
   *
   * @readonly
   * @type {TemplateContent[]}
   * @memberof LargeModalComponent
   */
  get templateContent(): TemplateContent[] { return this._templateContent; }

  constructor(public activeModal: NgbActiveModal) { }
  closeResult: string;

}
