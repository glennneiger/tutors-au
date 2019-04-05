import { inject } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration } from 'aurelia-router';
import { CourseRepo } from './services/course-repo';
import environment from "./environment";


@inject(CourseRepo)
export class App {
  title = 'Tutors';

  constructor(private courseRepo: CourseRepo) {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Tutors';
    config.options.pushState = environment.pushState;
    config.options.root = '/';
    config.map([
      {
        route: [''],
        moduleId: PLATFORM.moduleName('./components/main'),
        title: 'Module'
      },
      {
        route: ['course/*courseurl'],
        moduleId: PLATFORM.moduleName('./components/course-view'),
        title: 'Module'
      },
      {
        route: ['topic/*topicurl'],
        moduleId: PLATFORM.moduleName('./components/topic-view'),
        name: 'topic',
        title: 'Topic'
      },
      {
        route: ['video/*courseUrl/:videoid'],
        moduleId: PLATFORM.moduleName('./components/video-player'),
        name: 'video',
        title: 'Video'
      },
      {
        route: 'lab/*laburl/:step?',
        moduleId: PLATFORM.moduleName('./components/lab-view'),
        name: 'lab',
        title: 'Lab'
      },
      {
        route: 'talks/*courseurl',
        moduleId: PLATFORM.moduleName('./components/wall'),
        name: 'talk',
        title: 'Talks'
      },
      {
        route: 'labs/*courseurl',
        moduleId: PLATFORM.moduleName('./components/wall'),
        name: 'lab',
        title: 'Labs'
      },
      {
        route: 'videos/*courseurl',
        moduleId: PLATFORM.moduleName('./components/wall'),
        name: 'video',
        title: 'Video'
      },
      {
        route: 'archives/*courseurl',
        moduleId: PLATFORM.moduleName('./components/wall'),
        name: 'archive',
        title: 'Archives'
      },
      {
        route: 'githubs/*courseurl',
        moduleId: PLATFORM.moduleName('./components/wall'),
        name: 'github',
        title: 'Repos'
      },
      {
        route: "callback",
        name: "callback",
        moduleId: PLATFORM.moduleName("callback")
      },
    ]);
  }
}
