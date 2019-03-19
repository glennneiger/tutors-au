import { Lo } from './lo';
import { fixLinks } from './utils';
import { Course } from './course';
import { Lab } from './lab';

export class Topic {
  properties: Lo;
  units: Lo[];
  panelVideos: Lo[];
  panelTalks: Lo[];
  standardLos: Lo[];
  courseUrl: string;
  labs: Lab[] = [];
  los: Lo[] = [];
  course: Course;

  constructor(lo: Lo, url: string) {
    this.properties = lo;
    this.courseUrl = url;
    this.properties.img = lo.img;
    fixLinks(this.properties, url);
    this.units = lo.los.filter(lo => lo.type == 'unit');
    this.panelVideos = lo.los.filter(lo => lo.type == 'panelvideo');
    this.panelTalks = lo.los.filter(lo => lo.type == 'paneltalk');
    this.standardLos = lo.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');
  }
}
