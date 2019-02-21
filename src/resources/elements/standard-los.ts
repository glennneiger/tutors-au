import {Lo} from "../../services/lo";
import {bindable} from 'aurelia-framework';

export class StandardLos {
  @bindable los: Lo[];

  attached() {
    console.log(this.los);
  }
}
