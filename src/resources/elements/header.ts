import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Course } from '../../services/course';
import { iconColours, IconNav, icons } from '../../services/styles';
import environment from "../../environment";

interface Properties {
  [key: string]: any;
}

@inject(CourseRepo)
export class Header {
  @bindable title: string;
  moduleProperties: Properties = {};
  course: Course;

  companions: IconNav[] = [];
  walls: IconNav[] = [];

  homeicon: string;
  homelink: string;
  hometooltip: string;

  constructor(private courseRepo: CourseRepo) {
    this.moduleProperties = this.courseRepo.course.lo.properties;
    this.course = this.courseRepo.course;

    this.homeicon = 'fas fa-home fa-3x';
    this.homelink = `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`;
    this.hometooltip = 'To the top level Topics for this Module';

    this.createCompanionBar();
    this.createWallBar();
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
      icon: type,
    };
  }

  createWallBar() {
    this.course.walls.forEach((los, type) => {
      this.walls.push(this.createWallLink(type));
    });
    // if (this.course.walls[0].length > 0) this.walls.push(this.createWallLink('talk'));
    // if (this.course.walls[1].length > 0) this.walls.push(this.createWallLink('lab'));
    // if (this.course.walls[2].length > 0) this.walls.push(this.createWallLink('video'));
    // if (this.course.walls[3].length > 0) this.walls.push(this.createWallLink('github'));
    // if (this.course.walls[4].length > 0) this.walls.push(this.createWallLink('archive'));
  }

  createWallLink(type: string) {
    return {
      link: `${environment.urlPrefix}/${type}s/${this.courseRepo.courseUrl}`,
      icon: type,
    };
  }
}
