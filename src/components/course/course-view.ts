import { CourseRepo } from "../../services/course-repo";
import { Course } from "../../services/course";
import { NavigatorProperties } from "../../resources/elements/iconography/styles";
import { autoinject } from "aurelia-framework";
import { bindable } from "aurelia-framework";
@autoinject
export class CourseView {
  course: Course;

  portfolio = false;

  constructor(private courseRepo: CourseRepo, private navigatorProperties: NavigatorProperties) {}

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseurl);
    let p : any = this.course.lo.properties.portfolio
    this.portfolio =  p as boolean;
    this.navigatorProperties.init(this.course);
  }

  determineActivationStrategy() {
    return 'replace';
  }
}
