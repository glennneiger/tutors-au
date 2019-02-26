import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {Chapter, Course, Lab, Lo, Topic} from "../services/lo";

const path = require('path');

const md = require('markdown-it')()
  .use(require('markdown-it-highlightjs'), {})


@inject(CourseInterface)
export class LabView {

  lab: Lab;
  content = "";
  url = "";
  currentChapter: Chapter;

  constructor(private courseInterface: CourseInterface) {
  }

  async activate(params) {
    const lastSegment = params.laburl.substr(params.laburl.lastIndexOf('/') + 1)
    let chapter: Chapter = null;
    if (lastSegment.startsWith('book')) {
      this.url = params.laburl;
      this.lab = await this.courseInterface.getLab(this.url);
      this.currentChapter = this.lab.chapters[0];
    } else {
      this.url = path.dirname(params.laburl);
      this.lab = await this.courseInterface.getLab(this.url);
      this.currentChapter = this.lab.chapters.find(ch => ch.shortTitle == lastSegment);
    }

    const filtered = this.currentChapter.contentMd.replace('img\/', `https://${this.url}/img/`);
    this.content = md.render(filtered);
  }

  attached() {
  }
}

