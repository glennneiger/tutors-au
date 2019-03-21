import { Lo } from './lo';
import {Topic} from "./topic";

function fixLos(los:Lo[], prefix:string) {
  for (let lo of los) {
    lo.img = `https://${prefix}/${lo.folder}/${lo.img}`;
    if ('http' != lo.link.substr(0, 4)) {
      lo.link = `https://${prefix}/${lo.folder}/${lo.link}`;
    }
    if (lo.type == 'lab') {
      lo.link = `#lab/${prefix}/${lo.folder}`;
    }
    if (lo.type == 'panelvideo') {
      lo.link = `http://www.youtube.com/watch?v=${lo.videoid}`;
    }
    if (lo.videoid == 'none') {
      delete lo.videoid;
    }
    fixLos(lo.los, `${prefix}/${lo.folder}`)
  }
}

export function fixLinks(topic:Topic, url: string) {
  topic.lo.img = `https://${url}/${topic.lo.img}`;
  topic.lo.link = `#topic/${url}`;
  fixLos(topic.lo.los, url);
}
