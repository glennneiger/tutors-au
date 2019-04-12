import {Lo} from './lo';
import {Topic} from './topic';
import * as path from 'path';
import environment from '../environment';

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

export function findVideoLos(los: Lo[]): Lo[] {
  let result: Lo[] = [];
  los.forEach(lo => {
    if (lo.videoid) {
      result.push(lo);
    }
    if (lo.type == 'unit') {
      result = result.concat(findVideoLos(lo.los));
    }
  });
  return result;
}

export function allLos(lotype: string, los: Lo[]) {
  let allLos: Lo[] = [];
  for (let topic of los) {
    allLos = allLos.concat(findLos(topic.los, lotype));
  }
  return allLos;
}

export function allVideoLos(los: Lo[]) {
  let allLos: Lo[] = [];
  for (let topic of los) {
    allLos = allLos.concat(findVideoLos(topic.los));
  }
  return allLos;
}


function fixLos(topic: Topic, los: Lo[], prefix: string, courseUrl: string) {
  for (let lo of los) {
    lo.parentTopic = topic;
    lo.img = `https://${prefix}/${lo.folder}/${lo.img}`;
    // if ('http' != lo.link.substr(0, 4)) {
    //   lo.link = `https://${prefix}/${lo.folder}/${lo.link}`;
    // }
    switch (lo.type) {
      case  'lab' :
        lo.link = `${environment.urlPrefix}lab/${prefix}/${lo.folder}`;
        break;
      case 'panelvideo':
      case 'video:':
        lo.link = `http://www.youtube.com/watch?v=${lo.videoid}`;
        break;
      case 'unit' :
        lo.link = `${environment.urlPrefix}topic/${prefix}`;
        break;
      case 'talk':
        lo.pdf = `https://${prefix}/${lo.folder}/${lo.link}`;
        lo.link = `${environment.urlPrefix}talk/${prefix}/${lo.folder}/${lo.link}`;
        break
    }
    if (lo.videoid == 'none') {
      delete lo.videoid;
    } else if (lo.videoid) {
      lo.videoLink = `${environment.urlPrefix}video/${courseUrl}/${lo.videoid}`;
      if (lo.type=='panelvideo') {
        lo.link = `${environment.urlPrefix}video/${courseUrl}/${lo.videoid}`;
        lo.img = '';
      }
    }
    fixLos(topic, lo.los, `${prefix}/${lo.folder}`, courseUrl);
    lo.parentLink = topic.lo.link;
  }
}

export function fixLinks(topic: Topic, topicUrl: string, courseUrl: string) {
  topic.lo.img = `https://${topicUrl}/${topic.lo.img}`;
  topic.lo.link = `${environment.urlPrefix}topic/${topicUrl}`;
  fixLos(topic, topic.lo.los, topicUrl, courseUrl);
}

function removeLastDirectory(the_url) {
  var the_arr = the_url.split('/');
  the_arr.pop();
  return the_arr.join('/');
}

export function findCourseUrls(labUrl: string): string[] {
  let topicUrl = removeLastDirectory(labUrl);
  if (path.basename(topicUrl).startsWith('unit')) {
    topicUrl = removeLastDirectory(topicUrl);
  }
  const courseUrl = removeLastDirectory(topicUrl);
  return [courseUrl, topicUrl];
}
