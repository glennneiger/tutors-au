import { Lo } from './lo';
import { Topic } from './topic';
import { HttpClient } from 'aurelia-fetch-client';

export function findLos(los: Lo[], lotype: string): Lo[] {
  let result: Lo[] = [];
  los.forEach(lo => {
    if (lo.type === lotype) {
      result.push(lo);
    }
    if (lo.type == 'unit') {
      result = result.concat(findLos(lo.los, lotype));
    }
  });
  return result;
}

export class Course {
  properties: Lo;
  topicIndex = new Map();
  topics: Topic[] = [];
  url: string;

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
    this.properties = lo as Lo;
    this.url = this.url;
    for (let lo of this.properties.topics) {
      const topicUrl = this.url + '/' + lo.folder;
      const topic = new Topic(lo, topicUrl);
      this.topics.push(topic);
      this.topicIndex.set(topic.properties.folder, topic);
    }
  }

  allLos(lotype: string) {
    let allLos: Lo[] = [];
    for (let topic of this.properties.topics) {
      allLos = allLos.concat(findLos(topic.los, lotype));
    }
    return allLos;
  }
}
