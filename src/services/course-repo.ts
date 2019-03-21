import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Course } from './course';
import * as path from 'path';
import { Lab } from './lab';
import {findCourseUrl} from "./utils";

@inject(HttpClient)
export class CourseRepo {
  course: Course;
  courseUrl = '';
  topicUrl = '';

  constructor(private http: HttpClient) {}

  async getCourse(url) {
    if (!this.course || this.course.url !== url) {
      this.courseUrl = url;
      this.course = new Course(this.http, url);
      await this.course.fetchCourse();
    }
  }

  async fetchCourse(url: string) {
    await this.getCourse(url)
    return this.course;
  }

  async fetchTopic(url: string) {
    await this.getCourse(path.dirname(url))
    this.topicUrl = url;
    return this.course.topicIndex.get(path.basename(url));
  }

  async fetchLab(url: string) {
    await this.getCourse(findCourseUrl(url))
    const lab = new Lab(this.http, url);
    await lab.fetchLab();
    return lab;
  }

  async fetchWall(url:string, type:string){
    await this.getCourse(url)
    return this.course.allLos(type);
  }

  async fetchCourseProperties(url:string){
    await this.getCourse(url)
    return this.course.lo.properties;
  }
}
