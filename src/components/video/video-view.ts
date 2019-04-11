import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Lo } from '../../services/lo';
import { icons, NavigatorProperties } from '../../services/styles';

@inject(CourseRepo)
export class VideoView {
  lo: Lo;
  navigatorProperties: NavigatorProperties;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    const course = await this.courseRepo.fetchCourse(params.courseUrl);
    this.lo = course.videos.get(params.videoid);
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
}
