import { Lo } from './lo';
import { Topic } from './topic';
import { HttpClient } from 'aurelia-fetch-client';
import { findLos } from './utils';

export class Course {
  lo: Lo;
  topicIndex = new Map();
  topicLos: Lo[] = [];
  url: string;
  walls: Lo[][] = [];

  constructor(private http: HttpClient, url) {
    this.url = url;
  }

  async fetch(url: string) {
    const response = await this.http.fetch('https://' + url + '/index.json');
    const lo = await response.json();
    return lo;
  }

  async fetchCourse() {
    const lo = await this.fetch(this.url);
    this.lo = lo;
    this.url = this.url;
    for (let lo of this.lo.topics) {
      const topicUrl = this.url + '/' + lo.folder;
      const topic = new Topic(lo, topicUrl);
      this.topicIndex.set(topic.lo.folder, topic);
      this.topicLos.push(topic.lo);
    }
    this.walls.push(this.allLos('talk'));
    this.walls.push(this.allLos('lab'));
    this.walls.push(this.allLos('video'));
    this.walls.push(this.allLos('github'));
    this.walls.push(this.allLos('archive'));
  }

  allLos(lotype: string) {
    let allLos: Lo[] = [];
    for (let topic of this.lo.topics) {
      allLos = allLos.concat(findLos(topic.los, lotype));
    }
    return allLos;
  }
}
