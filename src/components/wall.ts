import { CourseRepo } from '../services/course-repo';
import { inject } from 'aurelia-framework';
import { Lo } from '../services/lo';

@inject(CourseRepo)
export class Wall {
  los: Lo[];
  title = '';

  constructor(private courseRepo: CourseRepo) {}

  async activate(params, route) {
    this.los = await this.courseRepo.fetchWall(params.courseurl, route.name);
    this.title = route.title;
  }

  determineActivationStrategy() {
    return 'invoke-lifecycle';
  }
}
