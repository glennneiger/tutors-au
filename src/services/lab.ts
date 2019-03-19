import { Lo } from './lo';
import { Topic } from './topic';
import { HttpClient } from 'aurelia-fetch-client';

export class Chapter {
  title: string;
  shortTitle: string;
  contentMd = '';
}

export class Lab {
  properties: Lo;
  chapters: Chapter[] = [];
  topic: Topic;
  url = '';

  constructor(private http: HttpClient, url) {
    this.url = url;
  }

  async fetch(url: string) {
    const response = await this.http.fetch('https://' + url + '/index.json');
    const lo = await response.json();
    return lo;
  }

  async fetchLab() {
    const lo = await this.fetch(this.url);
    this.properties = lo;
    lo.chapters.forEach(chapter => {
      this.chapters.push(chapter);
    });
  }
}
