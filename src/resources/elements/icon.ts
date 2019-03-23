import {iconColours, icons} from "../../services/styles";
import { bindable } from 'aurelia-framework';

export class Icon {
  @bindable type:string;

  icon() {
    return icons[this.type];
  }

  iconStyle() {
    return iconColours[this.type];
  }
}
