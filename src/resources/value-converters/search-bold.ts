import { isValid } from "../../services/search-util";
export class SearchBoldValueConverter {
  toView(value, searchTerm) {
    if (!isValid(searchTerm)) 
      return value;
    return value.replace(new RegExp(searchTerm, "gi"), `<b>$&</b>`);
  }
}
