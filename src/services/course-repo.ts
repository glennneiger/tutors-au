import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Course } from './course';
import * as path from 'path';
import { Lab } from './lab';
import { findCourseUrls } from './utils';
import { AuthService } from './auth-service';

@inject(HttpClient, AuthService)
export class CourseRepo {
  course: Course;
  courseUrl = '';
  topicUrl = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  async getCourse(url) {
    if (!this.course || this.course.url !== url) {
      this.courseUrl = url;
      this.course = new Course(this.http, url);
      try {
        await this.course.fetchCourse();
      } catch (e) {
        this.courseUrl = '';
        this.course = null;
      }
    }
  }

  async fetchCourse(url: string) {
    await this.getCourse(url);
    if (this.course.lo.properties.hasOwnProperty('auth') && (this.course.lo.properties.auth == 'true')) {
      console.log('secured');
      if (this.authService.isAuthenticated()) {
        console.log('your are logged in');
      } else {
        console.log('your are not logged in');
        localStorage.setItem('course_url', url);
        this.authService.login();
      }
    }
    return this.course;
  }

  async fetchTopic(url: string) {
    await this.getCourse(path.dirname(url));
    this.topicUrl = url;
    return this.course.topicIndex.get(path.basename(url));
  }

  async fetchLab(url: string) {
    const urls = findCourseUrls(url);
    await this.getCourse(urls[0]);
    const lab = new Lab(this.http, url);
    await lab.fetchLab();
    const topic = await this.fetchTopic(urls[1]);
    lab.topic = topic;
    return lab;
  }

  async fetchWall(url: string, type: string) {
    await this.getCourse(url);
    return this.course.allLos(type);
  }

  async fetchCourseProperties(url: string) {
    await this.getCourse(url);
    return this.course.lo.properties;
  }
}
