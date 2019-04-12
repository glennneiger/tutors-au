import { Lo } from './lo';
import { Topic } from './topic';
import { HttpClient } from 'aurelia-fetch-client';
import { allLos, allVideoLos } from './utils';

export class Course {
  lo: Lo;
  courseIcon = '';
  topicIndex = new Map();
  topicLos: Lo[] = [];
  topics : Topic[] = [];
  url: string;
  walls = new Map<string, Lo[]>();
  videos = new Map<string, Lo>();
  talks = new Map<string, Lo>();
  secured = false;

  constructor(private http: HttpClient, url) {
    this.url = url;
  }

  addWall(type: string) {
    const los = allLos(type, this.lo.topics);
    if (los.length > 0) {
      this.walls.set(type, los);
    }
    if (type == 'talk') {
      los.forEach(lo => {
        this.talks.set(`${lo.link}`, lo);
      });
    }
  }

  addVideoWall() {
    const videoLos = allVideoLos(this.lo.topics);
    if (videoLos.length > 0) {
      this.walls.set('video', videoLos);
    }
    videoLos.forEach(lo => {
      this.videos.set(lo.videoid, lo);
    });
  }

  populateWalls() {
    this.addWall('talk');
    this.addWall('lab');
    this.addVideoWall();
    this.addWall('github');
    this.addWall('archive');
  }

  async fetch(url: string) {
    const response = await this.http.fetch('https://' + url + '/index.json');
    const lo = await response.json();
    return lo;
  }

  async fetchCourse() {
    const lo = await this.fetch(this.url);
    this.lo = lo;
    for (let lo of this.lo.topics) {
      const topic = new Topic(lo, this.url);
      topic.course = this;
      this.topicIndex.set(topic.lo.folder, topic);
      this.topicLos.push(topic.lo);
      this.topics.push(topic);
    }
    this.courseIcon = this.lo.properties.faPanelicon;
    this.populateWalls();
  }
}
