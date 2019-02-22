import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Course, Lo, Topic} from "../services/lo";

@inject(CourseInterface)
export class TopicView {

  course: Course;
  topic: Topic;
  properties: Lo;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    this.course = await this.courseInterface.getCourseFromParams(params);
    this.topic = this.course.topicIndex.get(params.topicId);
    this.properties = this.topic.properties;
  }
}


