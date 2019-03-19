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
    this.link = this.lo.link;
    switch (this.lo.type) {
      case 'topic':
        this.link = `/#/topic/${this.courseRepo.courseUrl}/${this.lo.folder}`;
        break;
      case 'lab':
        const fullPath = path.dirname(this.lo.link);
        const labUrl = fullPath.replace(/(^\w+:|^)\/\//, '');
        this.link = `/#/lab/${labUrl}`
        break;
    }
  }
}
