import render from "./render.js";
import * as editor from "./editor.js";
import * as viewport from "./viewport.js";
import { format, save } from "./utils.js";

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
    input.textContent = format(localStorage.getItem("json-visualizer"));
  }
}

editor.default();
viewport.default();

render(jsonRef.current);
