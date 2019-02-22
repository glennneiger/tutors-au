import { bindable } from 'aurelia-framework';
import {Lo} from "../../services/lo";
import {inject} from 'aurelia-framework';
import {CourseInterface} from "../../services/course";

@inject(CourseInterface)
export class Header {
  @bindable properties: Lo;
  homeicon : string;
  homelink : string;
  hometooltip : string;

  constructor(private courseInterface: CourseInterface) {
  }

  attached() {
    if (this.properties.type === 'topic') {
      this.homeicon = 'fas fa-home fa-3x';
      this.homelink = `#/course/${this.courseInterface.courseUrl}`;
      this.hometooltip = 'To the top level Topics for this Module';
    }
  }
}
