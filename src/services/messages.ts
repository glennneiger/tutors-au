import {Course} from "./course";

export class CourseUpdate {
  course :Course;
  constructor(course:Course) {
    this.course = course;
  }
}
