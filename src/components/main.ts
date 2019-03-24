import { Router } from 'aurelia-router';
import { inject, Aurelia } from 'aurelia-framework';

@inject(Router)
export class Main {

  url: string;

  constructor (private router : Router){}

  openCourse() {
    this.url = this.url.substring(this.url.indexOf('//')+2);
    console.log (this.url);
    this.router.navigate(`https://wit-tutors.github.io/#course/${this.url}`);
  }
}
