import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration } from 'aurelia-router';
import { CourseRepo } from './services/course-repo';

@inject(CourseRepo)
export class App {
  title = 'Oileain';

  constructor(private courseRepo: CourseRepo) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Tutors';
    config.map([
      {
        route: ['course/*courseurl'],
        moduleId: PLATFORM.moduleName('./components/course-view'),
        title: 'Module'
      },
      {
        route: ['topic/*topicurl'],
        moduleId: PLATFORM.moduleName('./components/topic-view'),
        name: 'topic',
        title: 'TopicView'
      },
      {
        route: 'lab/*laburl/:step?',
        moduleId: PLATFORM.moduleName('./components/lab-view'),
        name: 'tbook',
        title: 'TopicView'
      },
      {
        route: 'talks/*courseurl',
        moduleId: PLATFORM.moduleName('./components/wall'),
        name: 'wall',
        title: 'Wall'
      },
      {
        route: ':start',
        moduleId: PLATFORM.moduleName('./components/start'),
        name: 'start',
        title: 'TopicView'
      }
    ]);
  }
}
