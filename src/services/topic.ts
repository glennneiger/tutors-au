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
  toc : Lo[] = [];

  constructor(lo: Lo, courseUrl: string) {
    this.lo = lo;
    const topicUrl = courseUrl + '/' + lo.folder;
    this.url = `${environment.urlPrefix}topic/` + topicUrl;
    fixLinks(this, topicUrl, courseUrl);
 //   this.units = lo.los.filter(lo => lo.type == 'unit');
    this.units = this.getSortedUnits();
    this.panelVideos = lo.los.filter(lo => lo.type == 'panelvideo');
    this.panelTalks = lo.los.filter(lo => lo.type == 'paneltalk');
    this.standardLos = lo.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');

    this.toc.push(...this.panelVideos);
    this.toc.push(...this.panelTalks);
    this.toc.push(...this.units);
    this.toc.push(...this.standardLos);
  }

  getSortedUnits() {
    const allUnits = this.lo.los.filter(lo => lo.type == 'unit');
    for (let unit of allUnits) {
      const panelVideos =   unit.los.filter(lo => lo.type == 'panelvideo');
      const panelTalks =   unit.los.filter(lo => lo.type == 'paneltalk');
      const standardLos = unit.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');
      const sortedLos : Lo[] = [];
      sortedLos.push(...panelVideos);
      sortedLos.push(...panelTalks);
      sortedLos.push(...standardLos);
      unit.los = sortedLos;
    }
    return allUnits;
  }
}
