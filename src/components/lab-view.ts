import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Course, Lab, Lo, Topic} from "../services/lo";

@inject(CourseInterface)
export class LabView {

  course: Course;
  topic: Topic;
  lab : Lab;
  test  = "";

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    this.course = await this.courseInterface.getCourseFromParams(params);
    this.topic = this.course.topicIndex.get(params.topicId);
    this.lab = await this.courseInterface.getLab(this.topic, params.labId)
    this.lab.chapters[1].content.forEach(str => {
      this.test = this.test.concat(str);
    })
  }

  attached() {
  }
}

