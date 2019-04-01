import { inject } from 'aurelia-framework';
import { CourseRepo } from '../services/course-repo';
import { Topic } from '../services/topic';
import { Course } from '../services/course';

@inject(CourseRepo)
export class VideoPlayer {
  course: Course;
  videoid : string;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseUrl);
    this.course = this.courseRepo.course;
    this.videoid = params.videoid;
  }
}
