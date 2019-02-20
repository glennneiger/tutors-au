import {inject} from 'aurelia-framework';
import {Course, CourseInterface, Lo} from "../services/course";

@inject(CourseInterface)
export class Topic {

  lo: Lo;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    console.log (params)
  }

  attached() {
  }
}

