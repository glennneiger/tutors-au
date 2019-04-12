import { inject } from 'aurelia-framework';
import { CourseRepo } from '../../services/course-repo';
import { Chapter, Lab } from '../../services/lab';
import { MarkdownParser } from '../../services/markdown-parser';
import environment from "../../environment";
import { autoinject } from 'aurelia-framework';
import {SideNavigator} from "../../resources/elements/navigators/side-navigator";
const path = require('path');

@autoinject
export class LabView {
  lab: Lab;
  content = '';
  url = '';
  currentChapter: Chapter;
  navbarHtml = '';

  constructor(private courseRepo: CourseRepo, private markdownParser: MarkdownParser) {}

  refreshav() {
    this.navbarHtml = '';
    this.lab.chapters.forEach(chapter => {
      const active = chapter == this.currentChapter ? 'class= uk-active' : '';
      this.navbarHtml = this.navbarHtml.concat(
        `<li ${active}> <a href="${environment.urlPrefix}lab/${this.url}/${chapter.shortTitle}"> ${chapter.shortTitle} </a> </li>`
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

    this.refreshav();
    this.content = this.markdownParser.parse(this.currentChapter.contentMd, this.url);
  }
}
