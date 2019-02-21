import {bindable} from 'aurelia-framework';
import {Lo} from "../../services/lo";

export class Card {
  @bindable lo: Lo;
  link: string;

  attached() {
    switch (this.lo.type) {
      case 'topic':
        this.link = `/#/topic/${this.lo.folder}`;
        break;
      case 'talk':
        this.link = `${this.lo.link}`;
        break;
      case 'lab':
        this.link = `/#/book/${this.lo.link}`;
        break;
    }
  }
}
