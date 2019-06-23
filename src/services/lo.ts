import { Topic } from "./topic";

export interface Lo {
  properties: { [prop: string]: string };
  type: string;
  title: string;
  img: string;
  video: string;
  pdf: string;
  summary: string;
  route: string;
  id: string;
  los: Lo[];
  parent: Topic;
}
