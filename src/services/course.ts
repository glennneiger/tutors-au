import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';
import {Course, Lab, Topic} from "./lo";

@inject(HttpClient)
export class CourseInterface {
  http: HttpClient;
  course: Course;
  courseUrl: string = "";

  constructor(http) {
    this.http = http;
  }

  async getCourseFromParams(params) {
    this.courseUrl = '';
    if (params.domain) {
      this.courseUrl = `${params.domain}`;
      if (params.folder) {
        this.courseUrl = `${this.courseUrl}/${params.folder}`;
      }
      await this.getCourse(this.courseUrl);
      return this.course;
    }
  }

  async getCourse(url: string) {
    const response = await this.http.fetch('https://' + this.courseUrl + '/index.json');
    const lo = await response.json();
    this.courseUrl = url;
    this.course = new Course(lo, 'https://' + this.courseUrl);
    return this.course;
  }

  async getLab(topic: Topic, labId: string) {
    const url = `https://${this.courseUrl}/${topic.properties.folder}/${labId}/index.json`
    const response = await this.http.fetch(url);
    const obj = await response.json();
    const lab = new Lab(obj);
    topic.labs.push(lab);
    return lab;
  }

  setCourse(course) {
    this.course = course;
    this.course = new Course(course, "/");
  }
}
