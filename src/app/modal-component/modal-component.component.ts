import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {count} from "rxjs";

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {count: number, width: number }) {}

  close() {

  }

  protected readonly count = count;
}
