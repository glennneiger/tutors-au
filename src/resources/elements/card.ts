import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { Lo } from '../../services/lo';
import { CourseRepo } from '../../services/course-repo';

@inject(CourseRepo)
export class Card {
  @bindable lo: Lo;
  link: string;

  constructor(private courseRepo: CourseRepo) {}

  attached() {
    this.link = this.lo.link;
    switch (this.lo.type) {
      case 'topic':
        this.link = `/#/topic/${this.courseRepo.courseUrl}/${this.lo.folder}`;
        break;
      case 'lab':
        this.link = `/#/lab/${this.courseRepo.topicUrl}/${this.lo.folder}`;
        break;
    }
  }
}
