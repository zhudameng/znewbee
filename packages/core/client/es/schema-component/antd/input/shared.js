export function HTMLEncode(html) {
  var temp = document.createElement('div');
  temp.textContent != null ? temp.textContent = html : temp.innerText = html;
  var output = temp.innerHTML;
  temp = null;
  return output;
}