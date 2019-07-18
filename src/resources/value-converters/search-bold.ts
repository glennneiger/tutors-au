export class SearchBoldValueConverter {
  toView(value, searchTerm) {
    console.log(value);
    if (!searchTerm) {
      return value;
    }
    let separator = "/a>";
    let indx = value.indexOf(separator);
    let subs0 = value.substring(0, indx + separator.length); // the link (anchor) part of value.
    let subs1 = value.substring(indx + separator.length, value.length); // the non link part of value.
    let subs2 = subs1.replace(new RegExp(searchTerm, "gi"), `<b style="background-color:MediumSeaGreen;">$&</b>`); //make occurrences of searchTerm bold in non anchor part.
    return subs0 + subs2; 
  }
}

