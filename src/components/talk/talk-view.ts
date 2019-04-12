import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Lo } from '../../services/lo';
import environment from '../../environment';
import * as pdfobject from 'pdfobject';
import { icons, NavigatorProperties } from '../../services/styles';
import { autoinject } from 'aurelia-framework';

@autoinject
export class TalkView {
  lo: Lo;

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties) {}

  async activate(params) {
    const course = await this.courseRepo.fetchCourseFromTalk(params.courseUrl);
    const ref = `${environment.urlPrefix}talk/${params.courseUrl}/${params.talkid}`;
    this.lo = course.talks.get(ref);

    this.navigatorProperties.subtitle = this.lo.parentTopic.lo.title
    this.navigatorProperties.title = this.lo.title;
    this.navigatorProperties.parentLink = this.lo.parentLink;
    this.navigatorProperties.parentIcon = icons['topic'];

    this.refreshPdf();
  }

  refreshPdf() {
    var options = {
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
  attached() {
    this.refreshPdf();
  }
}
