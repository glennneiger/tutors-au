import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Topic } from '../../services/topic';
import { Course } from '../../services/course';
import {Lo} from "../../services/lo";
import environment from "../../environment";

@inject(CourseRepo)
export class TalkView {
  course: Course;
  lo : Lo;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    await this.courseRepo.fetchCourseFromTalk(params.courseUrl);
    this.course = this.courseRepo.course;
    const ref = `${environment.urlPrefix}talk/${params.courseUrl}/${params.talkid}`;
    this.lo = this.course.talks.get(ref);
  }
}
