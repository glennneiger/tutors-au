const md = require('markdown-it')().use(require('markdown-it-highlightjs'), {});
var showdown = require('showdown');
//const converter = new showdown.Converter();
const showdownHighlight = require('showdown-highlight');
let converter = new showdown.Converter({
  extensions: [showdownHighlight]
});

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export class MarkdownParser {
  parse(md: string, url): string {
    let filtered = replaceAll(md, './img\\/', `img/`);
    filtered = replaceAll(filtered, 'img\\/', `https://${url}/img/`);

    filtered = replaceAll(filtered, './archives\\/', `archives/`);
    filtered = replaceAll(filtered, 'archives\\/', `https://${url}/archives/`);

    filtered = replaceAll(filtered, '\\]\\(\\#', `](https://${url}#/`);

    //
    // filtered = filtered.replace('#', '# ');
    // filtered = filtered.replace('# #', '##');
    return converter.makeHtml(filtered);
  }
}
