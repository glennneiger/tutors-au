import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Lo} from "../services/lo";

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

