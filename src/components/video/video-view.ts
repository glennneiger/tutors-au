import { CourseRepo } from '../../services/course-repo';
import { Lo } from '../../services/lo';
import { icons, NavigatorProperties } from '../../services/styles';
import { autoinject } from 'aurelia-framework';
import environment from "../../environment";

@autoinject
export class VideoView {
  lo: Lo;

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties) {}

  async activate(params) {
    const course = await this.courseRepo.fetchCourseFromTalk(params.courseUrl);
    const ref = `${environment.urlPrefix}video/${params.courseUrl}/${params.videoid}`;
    //this.lo = course.talks.get(ref);

    this.lo = course.videos.get(ref);

    this.navigatorProperties.subtitle = this.lo.parent.lo.title
    this.navigatorProperties.title = this.lo.title;
    this.navigatorProperties.parentLink = this.lo.parent.lo.route;
    this.navigatorProperties.parentIcon = icons['topic'];
  }

  determineActivationStrategy() {
    return 'replace';
  }
}
