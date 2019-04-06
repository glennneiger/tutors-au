import { Lo } from '../../../services/lo';
import { bindable } from 'aurelia-framework';

export class CardDeck {
  @bindable
  los: Lo[];
}
