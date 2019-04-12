import { CourseRepo } from '../../services/course-repo';
import { Lo } from '../../services/lo';
import { icons, NavigatorProperties } from '../../services/styles';
import environment from '../../environment';
import { autoinject } from 'aurelia-framework';

@autoinject
export class WallView {
  los: Lo[];
  name = '';

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties) {}

  async activate(params, route) {
    this.los = await this.courseRepo.fetchWall(params.courseurl, route.name);
    const course = this.courseRepo.course;
    this.name = route.name;

    this.navigatorProperties.title = `All ${route.name}'s in ${course.lo.title}`;
    this.navigatorProperties.subtitle = course.lo.properties.credits;
    this.navigatorProperties.parentLink = `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`;
    this.navigatorProperties.parentIcon = icons['moduleHome'];
  }

  determineActivationStrategy() {
    return 'invoke-lifecycle';
  }
}
