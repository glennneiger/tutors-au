import {Lo} from "../../services/lo";
import {bindable} from 'aurelia-framework';

export class PanelVideos {
  @bindable videos: Lo[];

  attached() {
    console.log(this.videos);
  }
}
