import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';
import {Course} from "./lo";

@inject(HttpClient)
export class CourseInterface {
  http: HttpClient;
  course: Course;

  constructor(http) {
    this.http = http;
  }

  async getCourse() {
    if (!this.course) {
      const response = await this.http.fetch('/index.json');
      const lo = await response.json();
      this.course = new Course(lo);
    }
    return this.course;
  }
}
