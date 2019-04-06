import { autoinject } from 'aurelia-framework';
import { CourseRepo } from '../../../services/course-repo';
import { Course } from '../../../services/course';
import { IconNav } from '../../../services/styles';
import environment from '../../../environment';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { computedFrom } from 'aurelia-framework';

interface Properties {
  [key: string]: any;
}

@autoinject
export class Header {
  moduleProperties: Properties = {};
  course: Course;

  companions: IconNav[] = [];
  walls: IconNav[] = [];

  homeicon = 'fas fa-home fa-3x';
  homelink: string;
  hometooltip = 'To the top level Topics for this Module';

  showHome = true;
  secured = false;

  init() {
    this.moduleProperties = this.courseRepo.course.lo.properties;
    this.course = this.courseRepo.course;
    this.secured = this.course.secured;
    this.homelink = `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`;
    this.createCompanionBar();
    this.createWallBar();
  }

  constructor(private courseRepo: CourseRepo, private ea: EventAggregator, private router: Router) {
    this.init();
  }

  createCompanionBar() {
    if (this.moduleProperties.adobeconnect) this.companions.push(this.createCompanionLink('adobeconnect'));
    if (this.moduleProperties.moodle) this.companions.push(this.createCompanionLink('moodle'));
    if (this.moduleProperties.slack) this.companions.push(this.createCompanionLink('slack'));
    if (this.moduleProperties.youtube) this.companions.push(this.createCompanionLink('youtube'));
  }

  createCompanionLink(type: string) {
    return {
      link: this.moduleProperties[type],
      icon: type
    };
  }

  createWallBar() {
    this.course.walls.forEach((los, type) => {
      this.walls.push(this.createWallLink(type));
    });
  }

  createWallLink(type: string) {
    return {
      link: `${environment.urlPrefix}/${type}s/${this.courseRepo.courseUrl}`,
      icon: type
    };
  }

  @computedFrom('router.currentInstruction')
  get title() {
    let s = '';
    if (this.router.currentInstruction !== null) s = this.router.currentInstruction.config.title;
    switch (s) {
      case 'Module':
        this.showHome = false;
        return this.course.lo.title;
        break;
      case 'Topic':
        return this.courseRepo.topic.lo.title;
        break;
      default:
        return `All ${s} in ${this.course.lo.title}`;
    }
    return this.router.currentInstruction.config.title;
  }
}
