import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Course, FullTopic, Lo, Topic} from "../services/lo";

@inject(CourseInterface)
export class TopicView {

  course: Course;
  topic: FullTopic;
  properties: Lo;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    this.topic = await this.courseInterface.getTopic(params.topicurl);
    this.properties = this.topic.properties;
  }
}


