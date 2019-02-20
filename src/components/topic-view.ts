import {inject} from 'aurelia-framework';
import {Course, CourseInterface, Lo, Topic} from "../services/course";

@inject(CourseInterface)
export class TopicView {

  topic : Topic;
  properties : Lo;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    const course = await this.courseInterface.getCourse();
    this.topic = course.topicIndex.get(params.topicId);
    this.properties = this.topic.properties;
  }

  attached() {
  }
}

