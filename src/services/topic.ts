import { Lo } from './lo';
import { Course } from './course';
import {fixLinks} from "./utils";

export class Topic {
  lo: Lo;
  units: Lo[];
  panelVideos: Lo[];
  panelTalks: Lo[];
  standardLos: Lo[];
  courseUrl: string;
  course: Course;

  constructor(lo: Lo, url: string) {
    this.lo = lo;
    this.courseUrl = url;
    this.lo.img = lo.img;
    fixLinks(this.lo, url);
    this.units = lo.los.filter(lo => lo.type == 'unit');
    this.panelVideos = lo.los.filter(lo => lo.type == 'panelvideo');
    this.panelTalks = lo.los.filter(lo => lo.type == 'paneltalk');
    this.standardLos = lo.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');
  }
}
