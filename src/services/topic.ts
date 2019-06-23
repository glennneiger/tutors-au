import { Lo } from "./lo";
import { fixRoutes } from "./utils";

export class Topic {
  lo: Lo;
  units: Lo[];
  panelVideos: Lo[];
  panelTalks: Lo[];
  standardLos: Lo[];
  toc: Lo[] = [];

  constructor(lo: Lo, courseUrl: string) {
    this.lo = lo;

    this.units = this.getSortedUnits();
    this.panelVideos = lo.los.filter(lo => lo.type == "panelvideo");
    this.panelTalks = lo.los.filter(lo => lo.type == "paneltalk");
    this.standardLos = lo.los.filter(lo => lo.type !== "unit" && lo.type !== "panelvideo" && lo.type !== "paneltalk");

    this.toc.push(...this.panelVideos);
    this.toc.push(...this.panelTalks);
    this.toc.push(...this.units);
    this.toc.push(...this.standardLos);

    this.toc.forEach(lo => {
      lo.parent = this;
      fixRoutes(lo);
      if (lo.type === "unit") {
        lo.los.forEach(subLo => {
          subLo.parent = this;
          fixRoutes(subLo);
        });
      }
    });
    fixRoutes(lo);
  }

  getSortedUnits() {
    const allUnits = this.lo.los.filter(lo => lo.type == "unit");
    for (let unit of allUnits) {
      const panelVideos = unit.los.filter(lo => lo.type == "panelvideo");
      const panelTalks = unit.los.filter(lo => lo.type == "paneltalk");
      const standardLos = unit.los.filter(
        lo => lo.type !== "unit" && lo.type !== "panelvideo" && lo.type !== "paneltalk"
      );
      const sortedLos: Lo[] = [];
      sortedLos.push(...panelVideos);
      sortedLos.push(...panelTalks);
      sortedLos.push(...standardLos);
      unit.los = sortedLos;
    }
    return allUnits;
  }
}
