import { CourseRepo } from "../../services/course-repo";
import { NavigatorProperties } from "../../resources/elements/iconography/styles";
import { autoinject } from "aurelia-framework";
import { Course } from "../../services/course";
import environment from "../../environment";
import { flattenedLos } from "../../services/search-util";
import { allLos } from "../../services/utils";
import { Lo } from "../../services/lo";
const path = require("path");
import { MarkdownParser } from "../../services/markdown-parser";

@autoinject
export class SearchView {
  course: Course;
  search_strings: string[] = [];
  searchTerm: string ='';

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties, private markdownParser: MarkdownParser) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseurl);

    this.navigatorProperties.title = this.course.lo.title;
    this.navigatorProperties.subtitle = "Search...";
    this.navigatorProperties.parentLink = `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`;
    this.navigatorProperties.parentIcon = "moduleHome";
    this.navigatorProperties.parentIconTip = "To module home ...";
    this.setSearchStrings();
    //this.currentChapter(params);
  }

  setSearchStrings() {
    console.log("searchString changed: ", this.searchTerm);

    const labs = allLos("lab", this.course.lo.los);
    //console.log(labs);

    //this.search_strings = search(labs, this.searchTerm);
    this.search_strings = flattenedLos(labs);
    //console.log("search strings", this.search_strings);
  }

  async currentChapter(params) {
    const lastSegment = params.laburl.substr(params.laburl.lastIndexOf("/") + 1);
    let chapter: Lo = null;
    let currentChapter: Lo = null;
    let url: string = "";
    let lab: Lo = null;
    if (lastSegment.startsWith("book")) {
      url = params.laburl;
      lab = await this.courseRepo.fetchLab(url);
      console.log("lab retrieved");
      currentChapter = lab.los[0];
    } else {
      url = path.dirname(params.laburl);
      lab = await this.courseRepo.fetchLab(url);
      currentChapter = lab.los.find(ch => ch.shortTitle == lastSegment);
    }

    let content = this.markdownParser.parse(currentChapter.contentMd, url);
  }

}
