import { inject } from 'aurelia-framework';
import { Lo } from '../services/lo';
import { CourseRepo } from '../services/course-repo';
import { Topic } from '../services/topic';

@inject(CourseRepo)
export class TopicView {
  topic: Topic;
  properties: Lo;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.topic = await this.courseRepo.fetchTopic(params.topicurl);
    this.properties = this.topic.properties;
  }
}
