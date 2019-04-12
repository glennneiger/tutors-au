import { Course } from './course';

export class NavigatorProperties {
  title: string;
  subtitle: string;
  icon: string;
  iconColour: string;
  parentLink: string;
  parentIcon: string;
  parentIconColour: string;

  init(course: Course) {
    this.title = course.lo.title;
    this.subtitle = course.lo.properties.credits;
    this.icon = course.lo.properties.faPanelicon;
    this.iconColour = course.lo.properties.faColour;
    this.parentLink = course.lo.properties.parent;
    this.parentIcon = icons['programHome'];
    this.parentIconColour = '';
  }
}

export const icons = {
  course: 'fas fa-book',
  topic: 'fas fa-sitemap',
  talk: 'fas fa-object-group',
  reference: 'fas fa-object-group',
  lab: 'fas fa-flask',
  archive: 'fas fa-file-archive',
  panelvideo: 'fab fa-youtube',
  video: 'fab fa-youtube',
  adobeconnect: 'far fa-address-card',
  slack: 'fab fa-slack',
  moodle: 'fas fa-graduation-cap',
  github: 'fab fa-github',
  youtube: 'fab fa-youtube-square',
  moduleHome: 'fas fa-home',
  programHome: 'fas fa-th',
  toc: 'fas fa-bars',
  film: 'fas fa-film',
  web: 'fas fa-bookmark',
  unit: 'fas fa-bookmark'
};

export const iconColours = {
  course: '#009688',
  topic: '#009688',
  talk: '#009688',
  reference: '#009688',
  lab: '#00BCD4',
  archive: '#453F78',
  panelvideo: '#F44336',
  video: '#F44336',
  adobeconnect: 'grey',
  slack: '#573852',
  moodle: '#f87f2a',
  github: 'black',
  youtube: 'red',
  moduleHome: '',
  programHome: '',
  toc: '',
  film: 'red',
  web: ''
};

export interface IconNav {
  link: string;
  icon: string;
}
