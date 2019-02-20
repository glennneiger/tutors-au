import {inject} from 'aurelia-framework';
import {Course, CourseInterface, Lo} from "../services/course";

@inject(CourseInterface)
export class CourseView {

  course: Course;
  properties : Lo;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    this.course = await this.courseInterface.getCourse();
    this.properties = this.course.properties;
  }
}
