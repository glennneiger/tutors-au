import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Course } from '../../services/course';

@inject(CourseRepo)
export class CourseView {
  course: Course;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseurl);
    console.log(this.course);
  }
}
