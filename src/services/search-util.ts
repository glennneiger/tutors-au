import { Lo } from "./lo";

function searchStrings(los: Lo[]) : string[] {
  let flatLos = flattenNestedLosArrays(los);
  let result: string[] = [];
  flatLos.forEach(lo => {
      console.log("lab ", lo);
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


function filter(array: string[], searchTerm: string) {
  return array.filter(item => {
      return searchTerm && searchTerm.length > 0 ? this.itemMatches(searchTerm, item) : true;
    });
}

function itemMatches(searchTerm: string, value: string) {
  let itemValue = value;
  if (!itemValue) return false;
    return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
}

export function search(los: Lo[], searchTerm: string) {
  let search_strings: string[] = [];
  let all_strings = searchStrings(los);
  all_strings.filter(item => {
    let found = searchTerm && searchTerm.length > 0 ? itemMatches(searchTerm, item) : true;
    if(found) {
      search_strings.push(item);
    }
  });
  return search_strings;
}
