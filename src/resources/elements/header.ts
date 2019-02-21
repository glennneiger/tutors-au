import { bindable } from 'aurelia-framework';
import {Lo} from "../../services/lo";

export class Header {
  @bindable properties: Lo;
  homeicon : string;
  homelink : string;
  hometooltip : string;

  attached() {
    if (this.properties.type === 'topic') {
      this.homeicon = 'fas fa-home fa-3x';
      this.homelink = '#/';
      this.hometooltip = 'To the top level Topics for this Module';
    }
  }
}
