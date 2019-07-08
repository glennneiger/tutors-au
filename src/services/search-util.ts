import { Lo } from "./lo";

export function flattenedLos(los: Lo[]) : string[] {
  let flatLos = flattenNestedLosArrays(los);
  let result: string[] = [];
  flatLos.forEach(lo => {
      result.push(`<a href="${lo.route}"> ${lo.shortTitle}</a>`);  
  });
  return result;
}

function flattenNestedLosArrays(los: Lo[]) {
  return flatten(los);
}

function flatten(arr: Lo[], result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value.los)) {
      flatten(value.los, result);
    } else {
      result.push(value);
    }
  }
  return result;
}


// function filter(array: string[], searchTerm: string) {
//   return array.filter(item => {
//       return searchTerm && searchTerm.length > 0 ? this.itemMatches(searchTerm, item) : true;
//     });
// }

// function itemMatches(searchTerm: string, value: string) {
//   let itemValue = value;
//   if (!itemValue) return false;
//     return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
// }

/**
 * Flattens a tree of learning objects. Then searches for the presence of
 * a search term. Creates an array of strings comprising the content of the
 * learning objects containing the search term.
 * @param los The array learning objects, assumed nested.
 * @param searchTerm The string being searched for.
 * @returns An array of strings each element of which contains the search term.
 */
// function search(los: Lo[], searchTerm: string) {
//   let search_strings: string[] = [];
//   let all_strings = flattenedLos(los);
//   all_strings.filter(item => {
//     let found = searchTerm && searchTerm.length > 0 ? itemMatches(searchTerm, item) : true;
//     if(found) {
//       search_strings.push(item);
//     }
//   });
//   return search_strings;
// }

/**
 * Validate a string: is valid if it is not undefined and 
 * does not comprise only whitespace else it is invalid.
 * @param str A string being validated.
 * @returns true if valid else false.
 */
export function isValid(str: string) {
 return str != undefined && /\S/.test(str) == true;
}
