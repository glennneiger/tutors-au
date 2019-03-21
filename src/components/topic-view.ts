import { inject } from 'aurelia-framework';
import { CourseRepo } from '../services/course-repo';
import { Topic } from '../services/topic';

@inject(CourseRepo)
export class TopicView {
  topic: Topic;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.topic = await this.courseRepo.fetchTopic(params.topicurl);
  }
}
