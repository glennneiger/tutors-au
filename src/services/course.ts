import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';
import {Course} from "./lo";

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
    // if (url == "") {
    //   if (this.course) {
    //     return this.course;
    //   }
    //   if (localStorage.tutors !== 'null') {
    //     this.courseUrl = localStorage.tutors;
    //   }
    // } else {
    //   this.courseUrl = url;
    //   window.localStorage.tutors = url;
    // }
    const response = await this.http.fetch('https://' + this.courseUrl + '/index.json');
    const lo = await response.json();
    this.course = new Course(lo, 'https://' + this.courseUrl);

    return this.course;
  }
}
