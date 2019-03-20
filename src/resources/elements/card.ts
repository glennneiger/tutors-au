import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { Lo } from '../../services/lo';
import { CourseRepo } from '../../services/course-repo';
import * as path from 'path';

@inject(CourseRepo)
export class Card {
  @bindable lo: Lo;
  link: string;

  constructor(private courseRepo: CourseRepo) {}

  attached() {
    const fullPath = path.dirname(this.lo.link);
    const url = fullPath.replace(/(^\w+:|^)\/\//, '');

    switch (this.lo.type) {
      case 'topic':
        this.link = `/#/topic/${url}`;
        break;
      case 'lab':
        this.link = `/#/lab/${url}`;
        break;
      default:
        this.link = this.lo.link;
    }
  }
}
