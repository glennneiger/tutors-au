import {iconColours, icons} from "../../services/styles";
import {bindable} from 'aurelia-framework';

export class Icon {
  @bindable type: string;
  @bindable size: string;
  @bindable colour: string;

  icon() {
    return icons[this.type] + ' ' + this.size;
  }

  iconStyle() {
    let c = iconColours[this.type];
    if (this.colour) {
      c = this.colour;
    }
    return c;
  }
}
