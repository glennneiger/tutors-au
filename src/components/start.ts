import {inject} from 'aurelia-framework';
import {RouterConfiguration, Router} from 'aurelia-router';
import {Lo} from "../services/lo";
import {CourseRepo} from "../services/course-repo";
import {Course} from "../services/course";


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

@inject(CourseRepo, Router)
export class Start {

  courseUrl: string;
  courseFiles: FileList;
  text: string;

  course: Course;
  properties: Lo;

  constructor(private courseRepo: CourseRepo, private router: Router) {
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
      // this.courseInterface.setCourse(json);
      // this.course = this.courseInterface.course;
      this.properties = this.course.properties;
      console.log(fileContents);
    } catch (e) {
      console.warn(e.message)
    }
  }
}
