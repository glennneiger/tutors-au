export interface Lo {
  title: string;
  type: string;
  folder: string;
  link: string;
  img: string;
  objectives: string;
  standardLos: Lo[];
  panelVideos: Lo[];
  panelTalks: Lo[];
  units: Lo[];
  los: Lo[];
  topics: Lo[];
}

function fixLinks(lo: Lo, url: string) {
  lo.img = `https://${url}/${lo.img}`;
  if ('http' != lo.link.substr(0, 4)) {
    lo.link = `https://${url}/${lo.link}`;
  }
  lo.los.forEach(lo => {
    fixLinks(lo, url);
  });
}

export class Chapter {
  title: string;
  shortTitle: string;
  contentMd = '';
}

export class Lab {
  properties: Lo;
  chapters: Chapter[] = [];
  topic: FullTopic;

  constructor(lo) {
    this.properties = lo;
    lo.chapters.forEach(chapter => {
      this.chapters.push(chapter);
    });
  }
}

export class FullTopic {
  properties: Lo;
  units: Lo[];
  panelVideos: Lo[];
  panelTalks: Lo[];
  standardLos: Lo[];
  courseUrl: string;
  labs: Lab[] = [];
  los: Lo[] = [];
  course: Course;

  constructor(lo: Lo, url: string) {
    this.properties = lo;
    this.courseUrl = url;
    this.properties.img = `https://${url}/${lo.img}`;
    fixLinks(this.properties, url);
    this.units = lo.los.filter(lo => lo.type == 'unit');
    this.panelVideos = lo.los.filter(lo => lo.type == 'panelvideo');
    this.panelTalks = lo.los.filter(lo => lo.type == 'paneltalk');
    this.standardLos = lo.los.filter(lo => lo.type !== 'unit' && lo.type !== 'panelvideo' && lo.type !== 'paneltalk');
  }

  async getLab(labId: string) {
    console.log(labId);
    return null;
  }
}

export class Topic {
  properties: Lo;
  courseUrl: string;

  constructor(lo: Lo, url: string) {
    this.properties = lo;
    this.courseUrl = url;
    this.properties.img = `https://${url}/${lo.img}`;
  }

  async getLab(labId: string) {
    console.log(labId);
    return null;
  }
}

export class Course {
  properties: Lo;
  topics: Topic[] = [];
  topicIndex = new Map();
  url: string;

  constructor(lo: Lo, url: string) {
    this.properties = lo;
    this.url = url;
    lo.topics.forEach(lo => {
      const topic = new Topic(lo, url);
      this.topics.push(topic);
      this.topicIndex.set(topic.properties.folder, topic);
    });
  }
}
