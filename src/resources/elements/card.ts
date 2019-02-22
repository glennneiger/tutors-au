import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Lo} from "../../services/lo";
import {CourseInterface} from "../../services/course";

@inject(CourseInterface)
export class Card {
  @bindable lo: Lo;
  link: string;

  constructor(private courseInterface: CourseInterface) {
  }

  attached() {
    this.link = this.lo.link;
    switch (this.lo.type) {
      case 'topic':
        this.link = `/#/topic/${this.courseInterface.courseUrl}/${this.lo.folder}`;
        break;
      case 'lab':
        this.link = `/#/lab/${this.courseInterface.courseUrl}/${this.lo.folder}`;
        break;
    }
  }
}
