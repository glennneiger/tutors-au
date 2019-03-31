import { Lo } from './lo';
import { Course } from './course';
import {fixLinks} from "./utils";
import environment from "../environment";

export class Topic {
  lo: Lo;
  units: Lo[];
  panelVideos: Lo[];
  panelTalks: Lo[];
  standardLos: Lo[];
  url: string;
  course: Course;

  constructor(lo: Lo, url: string) {
    this.lo = lo;
    this.url = `${environment.urlPrefix}topic/` + url;
    fixLinks(this, url);
    this.units = lo.los.filter(lo => lo.type == 'unit');
    this.panelVideos = lo.los.filter(lo => lo.type == 'panelvideo');
    this.panelTalks = lo.los.filter(lo => lo.type == 'paneltalk');
    this.standardLos = lo.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');
  }
}
