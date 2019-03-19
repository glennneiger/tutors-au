import { CourseRepo } from '../../services/course-repo';
import { inject } from 'aurelia-framework';

@inject(CourseRepo)
export class Walls {
  constructor(private courseRepo: CourseRepo) {}
}
