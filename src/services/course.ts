import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';
import {Course, FullTopic, Lab, Topic} from "./lo";

@inject(HttpClient)
export class CourseInterface {
  http: HttpClient;
  course: Course;
  courseUrl: string = "";

  constructor(http) {
    this.http = http;
  }

  async fetch(url: string) {
    const response = await this.http.fetch('https://' + url + '/index.json');
    const lo = await response.json();
    return lo;
  }

  async getCourse(url: string) {
    this.courseUrl = url;
    const lo = await this.fetch(url);
    this.course = new Course(lo, 'https://' + this.courseUrl);
    return this.course;
  }

  async getTopic(url: string) {
    this.courseUrl = url;
    const lo = await this.fetch(url);
    const topic = new FullTopic(lo, 'https://' + url);
    return topic;
  }

  async getLab(url: string) {
    const lo = await this.fetch(url);
    const lab = new Lab(lo);
    return lab;
  }

  setCourse(course) {
    this.course = course;
    this.course = new Course(course, "/");
  }
}
