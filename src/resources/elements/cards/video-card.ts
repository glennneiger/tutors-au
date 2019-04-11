import { bindable } from 'aurelia-framework';
import { Lo } from '../../../services/lo';

export class VideoCard {
  @bindable
  lo: Lo;
  @bindable
  autoplay = false;
}
