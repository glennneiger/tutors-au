import {iconColours, icons} from "../../services/styles";
import { bindable } from 'aurelia-framework';

export class Icon {
  @bindable type:string;
  @bindable size:string;

  icon() {
    return icons[this.type] + ' ' + this.size;
  }

  iconStyle() {
    return iconColours[this.type];
  }
}
