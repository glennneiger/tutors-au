import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Course } from './course';
import * as path from 'path';
import { Lab } from './lab';
import { findCourseUrls } from './utils';
import { AuthService } from './auth-service';
import { Topic } from './topic';
import { NavigatorProperties } from './styles';
import { autoinject } from 'aurelia-framework';

@autoinject
export class CourseRepo {
  course: Course;
  topic: Topic;
  lab: Lab;
  courseUrl = '';
  topicUrl = '';

  constructor(private http: HttpClient, private authService: AuthService, private navigatorProperties: NavigatorProperties) {}

  async getCourse(url) {
    if (!this.course || this.course.url !== url) {
      this.courseUrl = url;
      this.course = new Course(this.http, url);
      try {
        await this.course.fetchCourse();
        this.navigatorProperties.init(this.course);
      } catch (e) {
        this.courseUrl = '';
        this.course = null;
      }
    }
  }

  async fetchCourse(url: string) {
    await this.getCourse(url);
    // if (this.course.lo.properties.hasOwnProperty('auth') && this.course.lo.properties.auth == 'true') {
    //   this.course.secured = true;
    //   if (!this.authService.isAuthenticated()) {
    //     localStorage.setItem('course_url', url);
    //     this.authService.login();
    //   }
    // }
    return this.course;
  }

  async fetchTopic(url: string) {
    await this.fetchCourse(path.dirname(url));
    this.topicUrl = url;
    this.topic = this.course.topicIndex.get(path.basename(url));
    return this.topic;
  }

  async fetchLab(url: string) {
    const urls = findCourseUrls(url);
    await this.fetchCourse(urls[0]);
    const lab = new Lab(this.http, url);
    await lab.fetchLab();
    const topic = await this.fetchTopic(urls[1]);
    lab.topic = topic;
    this.lab = lab;
    return lab;
  }

  async fetchWall(url: string, type: string) {
    await this.fetchCourse(url);
    return this.course.walls.get(type);
  }

  async fetchCourseProperties(url: string) {
    await this.fetchCourse(url);
    return this.course.lo.properties;
  }

  async fetchCourseFromTalk(url: string) {
    console.log(url);
    const urls = findCourseUrls(url);
    await this.fetchCourse(urls[0]);
    return this.course;
  }
}
