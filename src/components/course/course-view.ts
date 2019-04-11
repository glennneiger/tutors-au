import {inject} from 'aurelia-framework';
import {CourseRepo} from '../../services/course-repo';
import {Course} from '../../services/course';
import {Lo} from "../../services/lo";
import {icons, NavigatorProperties} from "../../services/styles";

@inject(CourseRepo)
export class CourseView {
  course: Course;
  navigatorProperties: NavigatorProperties;

  constructor(private courseRepo: CourseRepo) {
  }

  async activate(params) {
    this.course = await this.courseRepo.fetchCourse(params.courseurl);
    const lo = this.course.lo;
    this.navigatorProperties = {
      title: this.course.lo.title,
      subtitle: this.course.lo.properties.credits,
      icon: this.course.lo.properties.faPanelicon,
      iconColour: this.course.lo.properties.faColour,
      parentLink: this.course.lo.properties.parent,
      parentIcon: icons['programHome'],
      parentIconColour: ''
    }
  }
}
