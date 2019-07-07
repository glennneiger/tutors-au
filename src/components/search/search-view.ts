import { CourseRepo } from "../../services/course-repo";
import { NavigatorProperties } from "../../resources/elements/iconography/styles";
import { autoinject } from "aurelia-framework";
import { Course } from "../../services/course";
import environment from "../../environment";
import { searchStrings } from "../../services/search-util";
import { allLos } from "../../services/utils";

@autoinject
export class SearchView {
  course: Course;
  search_strings: string[] = [];

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseurl);

    this.navigatorProperties.title = this.course.lo.title;
    this.navigatorProperties.subtitle = "Search...";
    this.navigatorProperties.parentLink = `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`;
    this.navigatorProperties.parentIcon = "moduleHome";
    this.navigatorProperties.parentIconTip = "To module home ...";

  }

  setSearchStrings() {
    const labs = allLos("lab", this.course.lo.los);
    console.log(labs);
    this.search_strings = searchStrings(labs);
  }

  click() {
    this.setSearchStrings() ;
  }
}
