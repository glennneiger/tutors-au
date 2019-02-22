import {inject} from 'aurelia-framework';
import {CourseInterface} from "../services/course";
import {RouterConfiguration, Router} from 'aurelia-router';
import {Course, Lo} from "../services/lo";


const readUploadedFileAsText = (inputFile) => {
  const temporaryFileReader = new FileReader();

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsText(inputFile);
  });
};

@inject(CourseInterface, Router)
export class Start {

  courseUrl: string;
  courseFiles: FileList;
  text: string;

  course: Course;
  properties: Lo;

  constructor(private courseInterface: CourseInterface, private router: Router) {
  }

  fileSelected() {
    this.courseUrl = this.courseFiles[0].name;
  }

  async open() {
    var file = this.courseFiles[0];
    try {
      const fileContents = await readUploadedFileAsText(file);
      const json = JSON.parse(fileContents.toString());
      console.log(json);
      this.courseInterface.setCourse(json);
      this.course = this.courseInterface.course;
      this.properties = this.course.properties;
      console.log(fileContents);
    } catch (e) {
      console.warn(e.message)
    }
  }
}
