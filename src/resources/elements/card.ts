import { bindable } from 'aurelia-framework';
import { Lo } from '../../services/lo';
import {iconColours, icons} from "../../services/styles";

export class Card {
  @bindable lo: Lo;

  icon(type: string) {
    return icons[type];
  }

  iconStyle(type: string) {
    return iconColours[type];
  }
}
