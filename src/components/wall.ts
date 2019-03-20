import { CourseRepo } from '../services/course-repo';
import { inject } from 'aurelia-framework';
import {Lo} from "../services/lo";

@inject(CourseRepo)
export class Wall {

  los : Lo[];

  constructor(private courseRepo: CourseRepo) {

  }

  async activate(params) {
    this.los = this.courseRepo.course.allLos('talk');
    console.log(params);
  }
}
