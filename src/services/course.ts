import { Lo } from "./lo";
import { Topic } from "./topic";
import { HttpClient } from "aurelia-fetch-client";
import {allLos, allVideoLos, findLos, fixRoutes, getSortedUnits, injectCourseUrl} from "./utils";
import environment from "../environment";

export class Course {
  lo: Lo;
  topics: Topic[] = [];
  units: Lo[];
  standardLos : Lo[];

  topicIndex = new Map();
  labIndex = new Map<string, Lo>();
  url: string;
  walls = new Map<string, Lo[]>();
  videos = new Map<string, Lo>();
  talks = new Map<string, Lo>();
  secured = false;

  constructor(private http: HttpClient, url) {
    this.url = url;
  }

  addWall(type: string) {
    const los = allLos(type, this.lo.los);
    if (los.length > 0) {
      this.walls.set(type, los);
    }
    if (type == "talk") {
      los.forEach(lo => {
        this.talks.set(`${lo.route}`, lo);
      });
    }
  }

  addVideoWall() {
    const videoLos = allVideoLos(this.lo.los);
    if (videoLos.length > 0) {
      this.walls.set("video", videoLos);
    }
    videoLos.forEach(lo => {
      this.videos.set(lo.video, lo);
    });
  }

  createLabIndex() {
    const labs = allLos("lab", this.lo.los);
    labs.forEach(lo => {
      fixRoutes(lo);
      this.labIndex.set(lo.route, lo);
    });
  }

  populateWalls() {
    this.addWall("talk");
    this.addWall("lab");
    this.addVideoWall();
    this.addWall("github");
    this.addWall("archive");
    this.createLabIndex();
  }

  async fetch(url: string, complete = false) {
    const response = await this.http.fetch("https://" + url + "/tutors.json");
    const lo = await response.json();
    injectCourseUrl(lo, url);
    return lo;
  }

  async fetchCourse() {
    this.lo = await this.fetch(this.url);
    if (environment.pushState) {
      this.lo.los = this.lo.los.filter(lo => lo.hide != true);
    }
    for (let lo of this.lo.los) {
      const topic = new Topic(lo, this.url);
      if (lo.type == 'unit') {
        lo.route = '#course/' + this.url;
      }
      this.topics.push(topic);
      this.topicIndex.set(lo.id, topic);
    }
    this.populateWalls();
    this.units = getSortedUnits(this.lo.los);
    this.standardLos = this.lo.los.filter(lo => lo.type !== "unit" && lo.type !== "panelvideo" && lo.type !== "paneltalk");

  }
}
