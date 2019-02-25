import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Chapter, Course, Lab, Lo, Topic} from "../services/lo";
const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'), {})

@inject(CourseInterface)
export class LabView {

  course: Course;
  topic: Topic;
  lab : Lab;
  content  = "";
  url="";

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    this.course = await this.courseInterface.getCourseFromParams(params);
    this.topic = this.course.topicIndex.get(params.topicId);
    this.lab = await this.courseInterface.getLab(this.topic, params.labId)


    this.url = `${this.courseInterface.courseUrl}/${params.topicId}/${params.labId}`;
    const step = params.stepId;
    let chapter =this.lab.chapters[0];
    if (step) {
      chapter = this.lab.chapters.find(ch => ch.shortTitle == step);
    }

    this.content = "";
    chapter.contentMd.forEach(str => {
      this.content = this.content.concat(str + '\n');
    })
    this.content= md.render(this.content);
  }

  attached() {
  }
}

