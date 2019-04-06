import { Router } from 'aurelia-router';
import { inject, Aurelia } from 'aurelia-framework';
import { computedFrom } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import {Course} from "../../services/course";
import environment from "../../environment";

@inject(Router, CourseRepo)
export class MainView {
  url: string;
  courseUrl: string;
  status: string;
  courseFound = false;
  course:Course;

  constructor(private router: Router, private courseRepo: CourseRepo) {}

  async setUrl() {
    let domain = this.url.substring(this.url.indexOf('//') + 2);

    const courseUrl = `${environment.courseBase}/${domain}`;
    await this.courseRepo.fetchCourse(domain);
    if (this.courseRepo.course) {
      this.course = this.courseRepo.course;
      this.courseUrl = courseUrl;
      this.status = 'Course available at:';
      this.courseFound = true;
    } else {
      this.courseFound = false;
      this.courseUrl = '';
      this.status = 'No Course found - check url again';
    }
  }
}
