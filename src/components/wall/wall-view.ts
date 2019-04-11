import { CourseRepo } from '../../services/course-repo';
import { inject } from 'aurelia-framework';
import { Lo } from '../../services/lo';
import { icons, NavigatorProperties } from '../../services/styles';
import environment from "../../environment";

@inject(CourseRepo)
export class WallView {
  los: Lo[];
  navigatorProperties: NavigatorProperties;
  name = ''

  constructor(private courseRepo: CourseRepo) {}

  async activate(params, route) {
    this.los = await this.courseRepo.fetchWall(params.courseurl, route.name);
    const course = this.courseRepo.course;
    this.name = route.name
    this.navigatorProperties = {
      title: `All ${route.name}'s in ${course.lo.title}`,
      subtitle: course.lo.properties.credits,
      icon: course.lo.properties.faPanelicon,
      iconColour: course.lo.properties.faColour,
      parentLink: `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`,
      parentIcon: icons['moduleHome'],
      parentIconColour: ''
    };
  }

  determineActivationStrategy() {
    return 'invoke-lifecycle';
  }
}
