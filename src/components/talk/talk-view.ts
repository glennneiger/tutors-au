import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Lo } from '../../services/lo';
import environment from '../../environment';
import * as pdfobject from 'pdfobject';
import { icons, NavigatorProperties } from '../../services/styles';

@inject(CourseRepo)
export class TalkView {
  lo: Lo;
  navigatorProperties: NavigatorProperties;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    const course = await this.courseRepo.fetchCourseFromTalk(params.courseUrl);
    const ref = `${environment.urlPrefix}talk/${params.courseUrl}/${params.talkid}`;
    this.lo = course.talks.get(ref);

    this.navigatorProperties = {
      title: this.lo.title,
      subtitle: this.lo.parentTopic.lo.title,
      icon: course.lo.properties.faPanelicon,
      iconColour: course.lo.properties.faColour,
      parentLink: this.lo.parentLink,
      parentIcon: icons['topic'],
      parentIconColour: ''
    };
  }
  attached() {
    var options = {
      //height: "720px",
      pdfOpenParams: {
        navpanes: 1,
        toolbar: 0,
        statusbar: 1,
        // view: "FitV",
        pagemode: 'thumbs',
        page: 1
      },
      forcePDFJS: true
    };

    pdfobject.embed(this.lo.pdf, '#pdf-placeholder', options);
  }
}
