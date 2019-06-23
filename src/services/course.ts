import { Lo } from "./lo";
import { Topic } from "./topic";
import { HttpClient } from "aurelia-fetch-client";
import { allLos, allVideoLos, findLos } from "./utils";
import environment from "../environment";

export class Course {
  lo: Lo;
  topics: Topic[] = [];
  topicIndex = new Map();
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

  populateWalls() {
    this.addWall("talk");
    this.addWall("lab");
    this.addVideoWall();
    this.addWall("github");
    this.addWall("archive");
  }

  async fetch(url: string) {
    const response = await this.http.fetch("https://" + url + "/tutors.json");
    const lo = await response.json();

    return lo;
  }

  async fetchCourse() {
    this.lo = await this.fetch(this.url);
    for (let lo of this.lo.los) {
      // if (lo.route && environment.pushState) {
      //   lo.route = lo.route.slice(1);
      // }
      const topic = new Topic(lo, this.url);

      this.topics.push(topic);
      this.topicIndex.set(lo.id, topic);
    }
    this.populateWalls();
  }
}
