import { autoinject } from 'aurelia-framework';
import { CourseRepo } from '../../../services/course-repo';
import { IconNav, NavigatorProperties } from '../../../services/styles';
import environment from '../../../environment';
import { bindable } from 'aurelia-framework';

interface Properties {
  [key: string]: any;
}

@autoinject
export class MainNavigator {
  @bindable
  navigatorProperties: NavigatorProperties;

  companions: IconNav[] = [];
  walls: IconNav[] = [];

  secured = false;

  constructor(private courseRepo: CourseRepo) {}

  attached() {
    this.secured = this.courseRepo.course.secured;
    this.createCompanionBar(this.courseRepo.course.lo.properties);
    this.createWallBar();
  }

  createCompanionBar(properties : Properties) {
    if (properties.adobeconnect) this.companions.push(this.createCompanionLink(properties['adobeconnect'],'adobeconnect' ));
    if (properties.moodle) this.companions.push(this.createCompanionLink(properties['moodle'],'moodle' ));
    if (properties.slack) this.companions.push(this.createCompanionLink(properties['slack'],'slack' ));
    if (properties.youtube) this.companions.push(this.createCompanionLink(properties['youtube'],'youtube' ));
  }

  createCompanionLink(link : string, type: string) {
    return {
      link: link,
      icon: type
    };
  }

  createWallBar() {
    this.courseRepo.course.walls.forEach((los, type) => {
      this.walls.push(this.createWallLink(type));
    });
  }

  createWallLink(type: string) {
    return {
      link: `${environment.urlPrefix}/${type}s/${this.courseRepo.courseUrl}`,
      icon: type
    };
  }
}
