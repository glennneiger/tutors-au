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
  lo.los.forEach(subLo => {
    fixLinks(subLo, url + '/' + lo.folder + '/');
  });
}
