import {HttpClient} from "aurelia-fetch-client";
import {inject} from 'aurelia-framework';
import {Course, FullTopic, Lab, Topic} from "./lo";
const path = require('path');

@inject(HttpClient)
export class CourseInterface {

  course: Course;
  courseUrl = '';

  topic: FullTopic;
  topicUrl = '';

  lab: Lab;
  labUrl = '';

  courses = new Map<string, Course>();
  topics = new Map<string, FullTopic>();
  labs = new Map<string, Lab>();

  constructor(private http: HttpClient) {}

  async fetch(url: string) {
    const response = await this.http.fetch('https://' + url + '/index.json');
    const lo = await response.json();
    return lo;
  }

  async getCourse(url: string) {
    this.courseUrl = url;
    this.course = this.courses.get(url);
    if (!this.course) {
      const lo = await this.fetch(url);
      this.course = new Course(lo,  this.courseUrl);
      this.courses.set(url, this.course);
    }
    return this.course;
  }

  async getTopic(url: string) {
    this.topicUrl = url;
    this.topic = this.topics.get(url);
    if (!this.topic) {
      const lo = await this.fetch(url);
      this.topic = new FullTopic(lo, url);
      this.topics.set(url, this.topic);
      const courseUrl = url.substring(0, url.lastIndexOf('/'));
      this.topic.course = await this.getCourse(courseUrl);
    }
    return this.topic;
  }

  async getLab(url: string) {
    this.lab = this.labs.get(url);
    if (!this.lab) {
      const lo = await this.fetch(url);
      this.lab = new Lab(lo);
      this.labs.set(url, this.lab)
      let topicUrl = url.substring(0, url.lastIndexOf('/'));
      const unit = path.basename(topicUrl);
      if (unit.startsWith('unit')) {
        topicUrl = topicUrl.substring(0, topicUrl.lastIndexOf('/'));
      }
      this.lab.topic = await this.getTopic(topicUrl);
    }
    return this.lab;
  }

  setCourse(course) {
    this.course = course;
    this.course = new Course(course, "/");
  }
}
