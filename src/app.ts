import {inject} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router, RouterConfiguration} from 'aurelia-router';
import {CourseInterface} from "./services/course";

@inject(CourseInterface)
export class App {
  title = 'Oileain';

  constructor(private courseInterface: CourseInterface) {
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Tutors';
    config.map([
      {
        route: ['course/:domain/:folder?'],
        moduleId: PLATFORM.moduleName('./components/course-view'),
        title: 'Module'
      },
      {
        route: 'topic/:domain/:folder?/:topicId',
        moduleId: PLATFORM.moduleName('./components/topic-view'),
        name: 'topic',
        title: 'TopicView'
      },
      {
        route: 'lab/:domain/:folder?/:topicId/:labId',
        moduleId: PLATFORM.moduleName('./components/lab-view'),
        name: 'tbook',
        title: 'TopicView'
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
