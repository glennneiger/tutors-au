import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Course, Lab, Lo, Topic} from "../services/lo";

@inject(CourseInterface)
export class LabView {

  course: Course;
  topic: Topic;
  lab : Lab;
  properties: Lo;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    this.course = await this.courseInterface.getCourseFromParams(params);
    this.topic = this.course.topicIndex.get(params.topicId);
    this.lab = this.topic.getLab(params.labId)
    this.properties = this.topic.properties;
  }

  attached() {
  }
}

