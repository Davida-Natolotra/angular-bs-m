import { Component, ViewChild, EventEmitter } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-pannel',
  templateUrl: 'pannel.component.html',
  styleUrls: ['pannel.component.scss'],
})
export class PannelComponent {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  zoom: boolean = false;
  zoomEffect() {
    this.zoom = !this.zoom;
  }
}
