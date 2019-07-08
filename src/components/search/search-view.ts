import { CourseRepo } from "../../services/course-repo";
import { NavigatorProperties } from "../../resources/elements/iconography/styles";
import { autoinject } from "aurelia-framework";
import { Course } from "../../services/course";
import environment from "../../environment";
import { flattenedLos } from "../../services/search-util";
import { allLos } from "../../services/utils";

@autoinject
export class SearchView {
  course: Course;
  search_strings: string[] = [];
<<<<<<< HEAD
=======
  searchTerm: string ='';
>>>>>>> search3

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseurl);

    this.navigatorProperties.title = this.course.lo.title;
    this.navigatorProperties.subtitle = "Search...";
    this.navigatorProperties.parentLink = `${environment.urlPrefix}/course/${this.courseRepo.courseUrl}`;
    this.navigatorProperties.parentIcon = "moduleHome";
    this.navigatorProperties.parentIconTip = "To module home ...";
    this.setSearchStrings();
  }

  setSearchStrings() {
    console.log("searchString changed: ", this.searchTerm);

    const labs = allLos("lab", this.course.lo.los);
    //console.log(labs);

    //this.search_strings = search(labs, this.searchTerm);
    this.search_strings = flattenedLos(labs);
    //console.log("search strings", this.search_strings);
  }

}
