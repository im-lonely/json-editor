import Root from "./components/Root.js";
import Key from "./components/Key.js";
import Text from "./components/Text.js";

const screen = document.getElementById("screen");

export default function render(json) {
  screen.innerHTML = "";

  const root = new Root();

  root.attach(screen);

  for (const key in json) {
    const value = json[key];

    const jsonKey = new Key(key);

    if (value === null) {
      jsonKey.append(parseValue(null));
      root.append(jsonKey);
      continue;
    }

    if (typeof value === "object") {
      jsonKey.append(traverse(key, value));
    } else if (Array.isArray(value)) {
      jsonKey.append(list(value));
    } else {
      jsonKey.append(parseValue(value));
    }

    root.append(jsonKey);
  }

  console.log(json);
}

function traverse(object) {
  const root = new Root();

  for (const key in object) {
    const value = object[key];

    const jsonKey = new Key(key);

    if (typeof value === "object") {
      jsonKey.append(traverse(value));
    } else if (Array.isArray(value)) {
      jsonKey.append(list(value));
    } else {
      jsonKey.append(parseValue(value));
    }

    root.append(jsonKey);
  }

  return root;
}

function list(array) {}

function parseValue(value) {
  return new Text(value);
}
