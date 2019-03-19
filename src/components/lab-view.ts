import { inject } from 'aurelia-framework';
import { CourseRepo } from '../services/course-repo';
import { Chapter, Lab } from '../services/lab';

const path = require('path');

const md = require('markdown-it')().use(require('markdown-it-highlightjs'), {});

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

@inject(CourseRepo)
export class LabView {
  lab: Lab;
  content = '';
  url = '';
  currentChapter: Chapter;
  navbarHtml = '';

  constructor(private courseRepo: CourseRepo) {}

  refreshav() {
    this.navbarHtml = '';
    this.lab.chapters.forEach(chapter => {
      const active = chapter == this.currentChapter ? 'class= uk-active' : '';
      this.navbarHtml = this.navbarHtml.concat(
        `<li ${active}> <a href="#lab/${this.url}/${chapter.shortTitle}"> ${chapter.shortTitle} </a> </li>`
      );
    });
  }

  async activate(params) {
    const lastSegment = params.laburl.substr(params.laburl.lastIndexOf('/') + 1);
    let chapter: Chapter = null;
    if (lastSegment.startsWith('book')) {
      this.url = params.laburl;
      this.lab = await this.courseRepo.fetchLab(this.url);
      this.currentChapter = this.lab.chapters[0];
    } else {
      this.url = path.dirname(params.laburl);
      this.lab = await this.courseRepo.fetchLab(this.url);
      this.currentChapter = this.lab.chapters.find(ch => ch.shortTitle == lastSegment);
    }

    const filtered = replaceAll(this.currentChapter.contentMd, 'img\\/', `https://${this.url}/img/`);

    this.refreshav();
    this.content = md.render(filtered);
  }

  attached() {}
}
