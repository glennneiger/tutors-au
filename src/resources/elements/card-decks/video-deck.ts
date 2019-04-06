import { Lo } from '../../../services/lo';
import { bindable } from 'aurelia-framework';

export class VideoDeck {
  @bindable
  videos: Lo[];
}
