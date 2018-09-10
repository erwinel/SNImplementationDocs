import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {
  /**
   * Title of modal popup.
   *
   * @memberof PopupModalComponent
   */
  @Input() titleText = '';

  /**
   * Content for body of modal popup.
   *
   * @memberof PopupModalComponent
   */
  @Input() bodyComponent;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
