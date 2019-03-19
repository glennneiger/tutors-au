import { Lo } from './lo';
import { Course } from './course';
import { Lab } from './lab';

export function fixLinks(lo: Lo, url: string) {
  lo.img = `https://${url}/${lo.img}`;
  if ('http' != lo.link.substr(0, 4)) {
    lo.link = `https://${url}/${lo.link}`;
  }
  for (let sublo of lo.los) {
    sublo.img = `https://${url}/${sublo.folder}/${sublo.img}`;
    if ('http' != sublo.link.substr(0, 4)) {
      sublo.link = `https://${url}/${sublo.folder}/${sublo.link}`;
    }
    for (let unitlo of sublo.los) {
      unitlo.img = `https://${url}/${sublo.folder}/${unitlo.folder}/${unitlo.img}`;
      if ('http' != unitlo.link.substr(0, 4)) {
        unitlo.link = `https://${url}/${sublo.folder}/${unitlo.folder}/${unitlo.link}`;
      }
    }
  }
}

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
