import render from "./render.js";
import * as editor from "./editor.js";
import * as viewport from "./viewport.js";

const jsonRef = {
  current: JSON.parse(localStorage.getItem("json-visualizer")) || {},
};

export const input = document.getElementById("input");
const message = document.getElementById("message");

input.focus();

input.addEventListener("input", function (e) {
  save(this);

  try {
    const json = JSON.parse(this.textContent);

    jsonRef.current = json;

    render(jsonRef.current);

    message.textContent = "";
  } catch (e) {
    message.textContent = this.textContent ? "invalid" : "";
  }
});

if (!(typeof Storage === "undefined")) {
  if (!localStorage.getItem("json-visualizer")) {
    localStorage.setItem("json-visualizer", "");
  } else {
    input.textContent = localStorage.getItem("json-visualizer");
  }
}

function save(element) {
  const noTab = element.textContent.replace(/\t/g, " ");
  const noStartOrTrailSpace = noTab.slice(1, noTab.length - 1).trim();
  const wrapToObject = `{${noStartOrTrailSpace}}`;

  localStorage.setItem("json-visualizer", wrapToObject);
}

editor.default();
viewport.default();

render(jsonRef.current);
