import render from "./render.js";
import * as editor from "./editor.js";
import * as viewport from "./viewport.js";
import { save } from "./utils.js";

let retrievedJSON;

try {
  retrievedJSON = JSON.parse(localStorage.getItem("json-visualizer"));
} catch (error) {
  retrievedJSON = {};
}

const jsonRef = {
  current: retrievedJSON,
};

export const input = document.getElementById("input");
const message = document.getElementById("message");

input.focus();

input.textContent = "\n";

input.addEventListener("input", function (e) {
  save(input);

  if (!this.textContent) input.textContent = "\n";

  try {
    const json = JSON.parse(input.textContent);

    jsonRef.current = json;

    render(jsonRef.current);

    message.textContent = "";
  } catch (e) {
    message.textContent = input.textContent ? "invalid" : "";
  }
});

if (!(typeof Storage === "undefined")) {
  if (!localStorage.getItem("json-visualizer")) {
    localStorage.setItem("json-visualizer", "");
  } else {
    input.textContent = localStorage.getItem("json-visualizer");
  }
}

editor.default();
viewport.default();

render(jsonRef.current);
