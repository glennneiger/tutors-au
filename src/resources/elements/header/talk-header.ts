import { bindable } from 'aurelia-framework';
import { Lo } from '../../../services/lo';

export class TalkHeader {
  @bindable
  lo: Lo;


  attached() {
    const s = this.lo.parentTopic.lo.title;
    const icon = this.lo.parentTopic.course.courseIcon;
    console.log(icon);
  }
}
