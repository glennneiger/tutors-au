import { Lo } from './lo';
import { Topic } from './topic';
import * as path from 'path';
import environment from "../environment";

export function findLos(los: Lo[], lotype: string): Lo[] {
  let result: Lo[] = [];
  los.forEach(lo => {
    if (lo.type === lotype) {
      result.push(lo);
    }
    if (lo.type == 'unit') {
      result = result.concat(findLos(lo.los, lotype));
    }
  });
  return result;
}

function fixLos(los: Lo[], prefix: string) {
  for (let lo of los) {
    lo.img = `https://${prefix}/${lo.folder}/${lo.img}`;
    if ('http' != lo.link.substr(0, 4)) {
      lo.link = `https://${prefix}/${lo.folder}/${lo.link}`;
    }
    if (lo.type == 'lab') {
      lo.link = `${environment.urlPrefix}lab/${prefix}/${lo.folder}`;
    }
    if (lo.type == 'panelvideo') {
      lo.link = `http://www.youtube.com/watch?v=${lo.videoid}`;
    }
    if (lo.videoid == 'none') {
      delete lo.videoid;
    }
    if (lo.type == 'unit') {
      lo.link = `${environment.urlPrefix}topic/${prefix}`;
    }
    fixLos(lo.los, `${prefix}/${lo.folder}`);
  }
}

export function fixLinks(topic: Topic, url: string) {
  topic.lo.img = `https://${url}/${topic.lo.img}`;
  topic.lo.link = `${environment.urlPrefix}topic/${url}`;
  fixLos(topic.lo.los, url);
}

function removeLastDirectory(the_url)
{
  var the_arr = the_url.split('/');
  the_arr.pop();
  return( the_arr.join('/') );
}

export function findCourseUrls(labUrl: string) : string[] {
  let topicUrl = removeLastDirectory(labUrl);
  if (path.basename(topicUrl).startsWith('unit')) {
    topicUrl = removeLastDirectory(topicUrl);
  }
  const courseUrl = removeLastDirectory(topicUrl);
  return [courseUrl, topicUrl];
}
