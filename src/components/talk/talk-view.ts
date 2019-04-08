import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Topic } from '../../services/topic';
import { Course } from '../../services/course';
import {Lo} from "../../services/lo";
import environment from "../../environment";
import * as pdfobject from 'pdfobject';

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
  attached () {

    var options = {
      //height: "720px",
      pdfOpenParams: {
        navpanes: 1,
        toolbar: 0,
        statusbar: 1,
        // view: "FitV",
        pagemode: "thumbs",
        page: 1
      },
      forcePDFJS: true
    };

    pdfobject.embed(this.lo.pdf, '#pdf-placeholder', options);
  }
}
