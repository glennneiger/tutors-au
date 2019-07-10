import { Configuration } from 'aurelia-cli';
import { MarkdownParser } from './markdown-parser';
import { Lo } from "./lo";
import { arrayExpression } from '@babel/types';

const extraChars: number = 160;

export function flattenedLos(los: Lo[], searchTerm: string) : string[] {
  let markdownParser = new MarkdownParser();
  let flatLos = flattenNestedLosArrays(los);
  let result: string[] = [];
  flatLos.forEach(lo => {
    //let url: string = removeFirstLastDirectories(lo.route);
    //let chapterHtml = markdownParser.parse(lo.contentMd, url);
    let substring = augmentedString(lo.contentMd, searchTerm, extraChars);
    result.push(`<a href="${lo.route}"> ${lo.shortTitle} ${substring}</a>`);  
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

// function findChapterUrl(url: string) {
//   //return removeFirstDirectory(removeLastDirectory(url));
//   return removeFirstLastDirectories(url);
// }

function removeFirstLastDirectories(the_url: string) {
  let the_arr = the_url.split("/");
  the_arr.pop();
  the_arr.shift();
  return the_arr.join("/");
}

// function removeLastDirectory(the_url) {
//   var the_arr = the_url.split("/");
//   the_arr.pop();
//   return the_arr.join("/");
// }

// function removeFirstDirectory(the_url) {
//   var the_arr = the_url.split("/");
//   the_arr.shift();
//   return the_arr.join("/");
// }

/**
 * Constructs a substring of targetString comprising searchTerm and 
 * extraChars on either side of searchTerm.
 * A precondition is that searchTerm is a substring of targetString.
 * @param targetString 
 * @param searchTerm 
 * @param extraChars 
 */
function augmentedString(targetString: string, searchTerm: string, extraChars: number) {
	let index = targetString.indexOf(searchTerm);
	let startIndex = index - extraChars > 0 ? index - extraChars : 0;
	let endIndex = index + searchTerm.length + extraChars;
	return targetString.slice(startIndex, endIndex);
}
