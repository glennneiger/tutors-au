import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';

export interface Lo {
  title: string,
  type: string,
  folder: string,
  link: string,
  img: string,
  objectives: string,
  standardLos: Lo[],
  panelVideos: Lo[],
  panelTalks: Lo[],
  units: Lo[],
  los: Lo[],
  topics: Lo[]
}


export class Topic {
  properties : Lo;
  units : Lo[];
  panelVideos : Lo[];
  panelTalks : Lo[];
  standardLos : Lo[];

  constructor (lo: Lo) {
    this.properties = lo;
    this.units = lo.los.filter(lo => lo.type == 'unit');
    this.panelVideos = lo.los.filter(lo => lo.type == 'panelvideo');
    this.panelTalks = lo.los.filter(lo => lo.type == 'paneltalk');
    this.standardLos = lo.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');
  }
}

export class Course {
  properties: Lo;
  topics: Topic[] = []
  topicIndex = new Map();

  constructor(lo: Lo) {
    this.properties = lo;
    lo.topics.forEach(lo => {
      const topic = new Topic(lo);
      this.topics.push(topic);
      this.topicIndex.set(topic.properties.folder, topic);
    });
  }
}


@inject(HttpClient)
export class CourseInterface {
  http: HttpClient;
  course: Course;

  constructor(http) {
    this.http = http;
  }

  async getCourse() {
    const response = await this.http.fetch('/index.json');
    const lo = await response.json();
    this.course = new Course(lo);
    return this.course;
  }
}
