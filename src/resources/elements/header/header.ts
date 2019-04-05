import { bindable } from 'aurelia-framework';
import { inject, autoinject } from 'aurelia-framework';
import { CourseRepo } from '../../../services/course-repo';
import { Course } from '../../../services/course';
import { IconNav } from '../../../services/styles';
import environment from '../../../environment';
import { EventAggregator } from 'aurelia-event-aggregator';
import {CourseUpdate} from "../../../services/messages";
import { Router } from 'aurelia-router';
import { computedFrom } from 'aurelia-framework';

interface Properties {
  [key: string]: any;
}

@autoinject
export class Header {
  //title: string;
  moduleProperties: Properties = {};
  course: Course;

  companions: IconNav[] = [];
  walls: IconNav[] = [];

  homeicon: string;
  homelink: string;
  hometooltip: string;

  init() {

    this.moduleProperties = this.courseRepo.course.lo.properties;
    this.course = this.courseRepo.course;
    //this.title = this.course.lo.title// + this.router.currentInstruction.config.name;

    this.homeicon = 'fas fa-home fa-3x';
    this.homelink = `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`;
    this.hometooltip = 'To the top level Topics for this Module';

    this.createCompanionBar();
    this.createWallBar();
  }


  constructor(private courseRepo: CourseRepo, private ea : EventAggregator, private router: Router) {
    // if (this.courseRepo.course) {
    //   this.init();
    // }
    ea.subscribe(CourseUpdate, msg => {
      this.course = msg.course;
      this.init();
    });
    this.ea.subscribe('router:navigation:complete', response => {
      console.log(response);
    });
  }

  activate() {
    this.ea.subscribe('router:navigation:complete', response => {
      console.log(response);
    });
  }

  deactivate() {
    //this.navEvent.dispose();
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
    if (this.router.currentInstruction !== null)
      s = this.router.currentInstruction.config.title
      switch(s) {
        case 'Module' : return this.course.lo.title;
        break;
        case 'Topic' : return this.courseRepo.topic.lo.title;
        break;
        default: return `All ${s} in ${this.course.lo.title}`
      }
      return this.router.currentInstruction.config.title;
  }
}
