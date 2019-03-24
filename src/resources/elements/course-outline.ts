import { bindable } from 'aurelia-framework';
import { Lo } from '../../services/lo';

export class CourseOutline {
  @bindable
  los: Lo[];
}
