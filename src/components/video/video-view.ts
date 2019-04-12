import { CourseRepo } from '../../services/course-repo';
import { Lo } from '../../services/lo';
import { icons, NavigatorProperties } from '../../services/styles';
import { autoinject } from 'aurelia-framework';

@autoinject
export class VideoView {
  lo: Lo;

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties) {}

  async activate(params) {
    const course = await this.courseRepo.fetchCourse(params.courseUrl);
    this.lo = course.videos.get(params.videoid);

    this.navigatorProperties.title = this.lo.title;
    this.navigatorProperties.subtitle = this.lo.parentTopic.lo.title;
    this.navigatorProperties.parentLink = this.lo.parentLink;
    this.navigatorProperties.parentIcon = icons['topic'];
  }
}
