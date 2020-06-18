/**
 * JS Playground implementation using eval in iframe
 */

function run() {
  const code = document.getElementById("code").value;
  const previewFrame = document.getElementById("previewFrame").contentWindow;
  previewFrame.postMessage({ command: "replace", arg: code }, "*");
}

function say(txt) {
  const mes = document.createTextNode(txt);
  document.body.appendChild(mes);
}
