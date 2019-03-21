import { inject } from 'aurelia-framework';
import { CourseRepo } from '../services/course-repo';
import { Topic } from '../services/topic';
import {Course} from "../services/course";

@inject(CourseRepo)
export class TopicView {
  topic: Topic;
  course: Course;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.topic = await this.courseRepo.fetchTopic(params.topicurl);
    this.course = this.courseRepo.course;
  }
}
