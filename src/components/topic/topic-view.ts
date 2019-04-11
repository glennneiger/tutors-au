import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Topic } from '../../services/topic';
import {Course} from "../../services/course";
import {Lo} from "../../services/lo";
import {icons, NavigatorProperties} from "../../services/styles";
import environment from "../../environment";

@inject(CourseRepo)
export class TopicView {
  topic: Topic;
  navigatorProperties: NavigatorProperties;

  constructor(private courseRepo: CourseRepo) {}

  async activate(params) {
    this.topic = await this.courseRepo.fetchTopic(params.topicurl);
   const course = this.courseRepo.course;
   const lo = this.topic.lo;

    this.navigatorProperties = {
      title: this.topic.lo.title,
      subtitle: course.lo.title,
      icon: course.lo.properties.faPanelicon,
      iconColour: course.lo.properties.faColour,
      parentLink: `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`,
      parentIcon: icons['moduleHome'],
      parentIconColour: ''
    }
  }
}
