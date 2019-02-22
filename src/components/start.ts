import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {RouterConfiguration, Router} from 'aurelia-router';

@inject(CourseInterface, Router)
export class Start {

  courseUrl : string;

  constructor(private courseInterface: CourseInterface, private router: Router) {
  }


  async open() {
    await this.courseInterface.getCourse(this.courseUrl);
    this.router.navigate("course");
  }
}
