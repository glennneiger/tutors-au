import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Topic } from '../../services/topic';
import { Course } from '../../services/course';
import {Lo} from "../../services/lo";

@inject(CourseRepo)
export class VideoView {
  course: Course;
  lo : Lo;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseUrl);
    this.course = this.courseRepo.course;
    this.lo = this.course.videos.get(params.videoid);
  }
}
