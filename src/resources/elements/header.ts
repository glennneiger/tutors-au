import { bindable } from 'aurelia-framework';
import { Lo } from '../../services/lo';
import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';

@inject(CourseRepo)
export class Header {
  @bindable properties: Lo;
  homeicon: string;
  homelink: string;
  hometooltip: string;
  talksLink : string;

  constructor(private courseRepo: CourseRepo) {
    this.homeicon = 'fas fa-home fa-3x';
    this.homelink = `#/course/${this.courseRepo.courseUrl}`;
    this.hometooltip = 'To the top level Topics for this Module';
    this.talksLink = `#/talks/${this.courseRepo.courseUrl}`;
  }
}
