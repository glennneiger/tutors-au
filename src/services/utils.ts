import { Lo } from './lo';
import {Topic} from "./topic";

export function fixLinks(topic:Topic, url: string) {
  topic.lo.img = `https://${url}/${topic.lo.img}`;
  topic.lo.link = `#topic/${url}`;

  for (let lo of topic.lo.los) {
    lo.img = `https://${url}/${lo.folder}/${lo.img}`;
    if ('http' != lo.link.substr(0, 4)) {
      lo.link = `https://${url}/${lo.folder}/${lo.link}`;
    }
    if (lo.type == 'lab') {
      lo.link = `#lab/${url}/${lo.folder}`;
    }
    for (let unitlo of lo.los) {
      unitlo.img = `https://${url}/${lo.folder}/${unitlo.folder}/${unitlo.img}`;
      if ('http' != unitlo.link.substr(0, 4)) {
        unitlo.link = `https://${url}/${lo.folder}/${unitlo.folder}/${unitlo.link}`;
      }
      if (unitlo.type == 'lab') unitlo.link = `#lab/${url}/${lo.folder}/${unitlo.folder}`;
    }
  }
}
