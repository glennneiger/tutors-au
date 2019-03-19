import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Course, Lo} from "../services/lo";

@inject(CourseInterface)
export class CourseView {

  course: Course;
  properties: Lo;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    console.log(params);
    this.course = await this.courseInterface.getCourse(params.courseurl);
    this.properties = this.course.properties;
  }
}
