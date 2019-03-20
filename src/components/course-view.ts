import { inject } from 'aurelia-framework';
import { Lo } from '../services/lo';
import { CourseRepo } from '../services/course-repo';
import { Course } from '../services/course';
import { Topic } from '../services/topic';

@inject(CourseRepo)
export class CourseView {
  course: Course;
  properties: Lo;
  los: Topic[];

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseurl);
    this.properties = this.course.properties;
    this.los = this.course.topics;
  }
}
