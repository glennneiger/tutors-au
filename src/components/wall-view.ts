import { CourseRepo } from '../services/course-repo';
import { inject } from 'aurelia-framework';
import { Lo } from '../services/lo';

@inject(CourseRepo)
export class WallView {
  los: Lo[];
  title = '';
  name = '';

  constructor(private courseRepo: CourseRepo) {}

  async activate(params, route) {
    this.los = await this.courseRepo.fetchWall(params.courseurl, route.name);
    this.title = route.title;
    this.name = route.name;
  }

  determineActivationStrategy() {
    return 'invoke-lifecycle';
  }
}
