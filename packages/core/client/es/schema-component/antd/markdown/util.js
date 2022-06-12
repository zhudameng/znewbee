import { marked } from 'marked';
export function markdown(text) {
  if (!text) {
    return '';
  }

  return marked.parse(text);
}
export function convertToText(markdownText) {
  var content = markdown(markdownText);
  var temp = document.createElement('div');
  temp.innerHTML = content;
  var text = temp.innerText;
  temp = null;
  return text.replace(/[\n\r]/g, '');
}