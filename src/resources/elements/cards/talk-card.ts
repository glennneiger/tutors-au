import { bindable } from "aurelia-framework";
import { Lo } from "../../../services/lo";
import * as pdfobject from "pdfobject";

export class TalkCard {
  @bindable
  lo: Lo;

  attached() {
    // const fallback = `<br> <a class='uk-button uk-button-default' href='[url]'>Open ${this.lo.title} PDF`;
    // var options = {
    //   pdfOpenParams: {
    //     navpanes: 1,
    //     toolbar: 1,
    //     statusbar: 1,
    //     // view: "FitV",
    //     pagemode: "thumbs",
    //     page: 1,
    //     scrollbar: "1",
    //     height: "1024px"
    //   },
    //   fallbackLink: fallback,
    //   forcePDFJS: true
    // };
    // pdfobject.embed(this.lo.pdf, "#pdf-placeholder", options);
  }
}
