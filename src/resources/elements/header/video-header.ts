import { bindable } from 'aurelia-framework';
import { Lo } from '../../../services/lo';

export class VideoHeader {
  @bindable
  lo: Lo;

  homeicon = 'fas fa-arrow-up fa-3x';
}
