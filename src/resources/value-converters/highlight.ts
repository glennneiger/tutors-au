import { isValid } from "../../services/search-util";
export class HighlightValueConverter {
  toView(value) {
    if (isValid(value) && value.indexOf("<b>") !== -1) {
      return `<span style='background-color:#eceeef; padding:10px'>${value}</span>`;
    }
    return value;
  }
}
