import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-framework';
import { Lo } from '../../../services/lo';
import {iconColours, icons} from "../../../services/styles";
import environment from "../../../environment";
import * as path from 'path';
import {CourseRepo} from "../../../services/course-repo";

@inject(CourseRepo)
export class Card {
  @bindable lo: Lo;
  videoLink : string;

  constructor(private courseRepo: CourseRepo) {}

  attached() {
    if (this.lo.videoid) {
      const url = path.dirname(this.lo.link);
      this.videoLink = `${environment.urlPrefix}video/${this.courseRepo.courseUrl}/${this.lo.videoid}`;
      //this.videoLink = `${environment.urlPrefix}video/${url}/${this.lo.videoid}`;
    }
  }
}
