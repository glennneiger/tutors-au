import { Lo } from './lo';

export async function readLo(url: string) {
  const response = await this.http.fetch('https://' + url + '/index.json');
  const lo = await response.json();
  return lo;
}

export function fixLinks(lo: Lo, url: string) {
  lo.img = `https://${url}/${lo.img}`;
  if ('http' != lo.link.substr(0, 4)) {
    lo.link = `https://${url}/${lo.link}`;
  }
  for (let sublo of lo.los) {
    sublo.img = `https://${url}/${sublo.folder}/${sublo.img}`;
    if ('http' != sublo.link.substr(0, 4)) {
      sublo.link = `https://${url}/${sublo.folder}/${sublo.link}`;
    }
    for (let unitlo of sublo.los) {
      unitlo.img = `https://${url}/${sublo.folder}/${unitlo.folder}/${unitlo.img}`;
      if ('http' != unitlo.link.substr(0, 4)) {
        unitlo.link = `https://${url}/${sublo.folder}/${unitlo.folder}/${unitlo.link}`;
      }
    }
  }
}
