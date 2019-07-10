import { isValid } from "../../services/search-util";
export class HighlightValueConverter {
  toView(value, searchTerm) {
    if (isValid(value) && value.indexOf("<b>") !== -1) {
      return `<span style='background-color:#f9faf7; padding:10px'>${value}</span>`;
    }
    return value;
  }
}
