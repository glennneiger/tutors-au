import { Lo } from '../../../services/lo';
import { bindable } from 'aurelia-framework';

export class UnitDeck {
  @bindable
  units: Lo[];
  panelVideos: Lo[];
}
