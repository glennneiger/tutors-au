import { MarkdownParser } from './markdown-parser';
import { Lo } from "./lo";
import { arrayExpression } from '@babel/types';
import environment from 'environment';

const extraChars: number = +`${environment.search}`;

/**
 * Searches an array of nested Lo arrays for presence of searchTerm.
 * When a string containing the searchTerm is found, it is augmented by
 * adding extraChars number characters of target.
 * The term extraChars is set as an environment property, key search.
 * @param los The nested arrays of Lo objects.
 * @param searchTerm The term whose presence is searched for.
 */
export function flattenedLos(los: Lo[], searchTerm: string) : string[] {
  let markdownParser = new MarkdownParser();
  let flatLos = flattenNestedLosArrays(los);
  let result: string[] = [];
  flatLos.forEach(lo => {
    let substring = augmentedString(lo.contentMd, searchTerm, extraChars);
    let url: string = removeFirstLastDirectories(lo.route);
    let html = markdownParser.parse(substring, url);
    result.push(`<a href="${lo.route}"> ${lo.shortTitle}</a>  ${html}`);  
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

/**
 * Validate a string: is valid if it is not undefined and 
 * does not comprise only whitespace else it is invalid.
 * @param str A string being validated.
 * @returns true if valid else false.
 */
export function isValid(str: string) {
 return str != undefined && /\S/.test(str) == true;
}

function removeFirstLastDirectories(the_url: string) {
  let the_arr = the_url.split("/");
  the_arr.pop();
  the_arr.shift();
  return the_arr.join("/");
}

/**
 * Constructs a substring of targetString comprising searchTerm and 
 * extraChars on either side of searchTerm.
 * A precondition is that searchTerm is a substring of targetString.
 * @param targetString The string being searched.
 * @param searchTerm The term being sought in targetString.
 * @param extraChars The extra chars added to length searchTerm determines total length returned sring.
 */
function augmentedString(targetString: string, searchTerm: string, extraChars: number) {
	let startIndex = targetString.indexOf(searchTerm);
  startIndex = startIndex > 0 ? startIndex : 0;
  let endIndex = startIndex + searchTerm.length + extraChars;
	endIndex = endIndex < targetString.length ? endIndex : targetString.length;
	return targetString.slice(startIndex, endIndex);
}
