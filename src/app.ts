import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  title = 'Oileain';
  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Tutors';
    config.map([
      {
        route: [''],
        moduleId: PLATFORM.moduleName('./components/course-view'),
        title: 'Module'
      },
      {
        route: 'topic/:topicId',
        moduleId: PLATFORM.moduleName('./components/topic-view'),
        name: 'topic',
        title: 'TopicView'
      },
      {
        route: 'book/:topicId/:bookId?',
        moduleId: PLATFORM.moduleName('./components/book'),
        name: 'topic',
        title: 'TopicView'
      }
    ]);
  }
}
