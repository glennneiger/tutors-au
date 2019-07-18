export class SearchBoldValueConverter {
  toView(value, searchTerm) {
    if (!searchTerm) return value;
    return value.replace(new RegExp(searchTerm, "gi"), `<b style="background-color:MediumSeaGreen;">$&</b>`);
  }
}
