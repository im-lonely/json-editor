import Key from "./components/Key.js";
import Root from "./components/Root.js";

import { depth, parseValue, size } from "./utils.js";

const screen = document.getElementById("screen");

let globalDepth = 0;
let globalSize = 0;

export default function render(json) {
  globalDepth = depth(json);
  globalSize = size(json);

  screen.innerHTML = "";

  screen.appendChild(traverse(json).element);

  resize();
}

function traverse(object) {
  const root = new Root();

  for (const key in object) {
    const value = object[key];

    const jsonKey = new Key(key);

    if (value === null) {
      jsonKey.append(parseValue(null));
      root.append(jsonKey);
      continue;
    } else if (typeof value === "object" && !Object.keys(value).length) {
      jsonKey.append(parseValue({}));
      root.append(jsonKey);
      continue;
    }

    if (Array.isArray(value)) {
      jsonKey.append(list(value));
    } else if (typeof value === "object") {
      jsonKey.append(traverse(value));
    } else {
      jsonKey.append(parseValue(value));
    }

    jsonKey.element.classList.add("key");

    root.append(jsonKey);
  }

  Array.from(root.element.children).forEach((element) => {
    element.style.marginLeft = 0;
  });

  root.element.classList.add("object");

  return root;
}

function list(array) {
  const root = new Root();

  for (const value of array) {
    if (value === null) {
      root.append(parseValue(null));
      continue;
    } else if (typeof value === "object" && !Object.keys(value).length) {
      root.append(parseValue({}));
      continue;
    }

    if (Array.isArray(value)) {
      root.append(list(value));
    } else if (typeof value === "object") {
      root.append(traverse(value));
    } else {
      root.append(parseValue(value));
    }
  }

  Array.from(root.element.children).forEach((element) => {
    element.style.marginLeft = 0;
  });

  root.element.classList.add("array");

  return root;
}

window.addEventListener("resize", resize);

function resize() {
  screen.style.minWidth = `calc(100vw + ${
    globalDepth * 64 - 32 > innerWidth ? globalDepth * 64 - 32 : 0
  }px - ${innerWidth < 1500 ? 0 : 500}px)`;
  screen.style.minHeight = `calc(100vh + ${
    globalSize * 24 > innerHeight ? globalSize * 24 : 0
  }px - ${innerWidth < 1500 ? 400 : 0}px)`;
}
