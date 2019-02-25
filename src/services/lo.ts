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

function fixLinks(lo: Lo, url: string) {
  lo.img = `${url}/${lo.img}`;
  if ('http' != lo.link.substr(0, 4)) {
    lo.link = `${url}/${lo.link}`;
  }
  lo.los.forEach(lo => {
    fixLinks(lo, url);
  });
}

export class Chapter {
  title: string;
  shortTitle: string;
  content: string[];
  contentMd: string[];
}

export class Lab {
  properties: Lo;
  chapters: Chapter[] = [];

  constructor(lo) {
    this.properties = lo;
    lo.chapters.forEach(chapter => {
      this.chapters.push(chapter);
    });
  }
}


export class Topic {
  properties: Lo;
  units: Lo[];
  panelVideos: Lo[];
  panelTalks: Lo[];
  standardLos: Lo[];
  courseUrl: string;
  labs: Lab[] = [];

  constructor(lo: Lo, url: string) {
    this.properties = lo;
    this.courseUrl = url;
    fixLinks(this.properties, url);
    this.units = lo.los.filter(lo => lo.type == 'unit');
    this.panelVideos = lo.los.filter(lo => lo.type == 'panelvideo');
    this.panelTalks = lo.los.filter(lo => lo.type == 'paneltalk');
    this.standardLos = lo.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');
  }

  async getLab (labId: string) {
    console.log (labId);
    return null;
  }
}

export class Course {
  properties: Lo;
  topics: Topic[] = []
  topicIndex = new Map();
  url: string;

  constructor(lo: Lo, url: string) {
    this.properties = lo;
    this.url = url;
    lo.topics.forEach(lo => {
      const topic = new Topic(lo, url);
      this.topics.push(topic);
      this.topicIndex.set(topic.properties.folder, topic);
    });
  }
}
