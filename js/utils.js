import Text from "./components/Text.js";

export function depth(object) {
  let level = 1;

  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if (typeof object[key] == "object") {
      const objDepth = depth(object[key]) + 1;
      level = Math.max(objDepth, level);
    }
  }

  return level;
}

export function size(object) {
  let objSize = 1;

  for (const key in object) {
    const value = object[key];

    if (typeof value === "object") objSize += size(value);
    else objSize++;
  }

  return objSize;
}

export function parseValue(value) {
  const text = new Text(value);
  text.element.classList.add("value");
  return text;
}

export function save(element) {
  console.log(element.textContent);

  localStorage.setItem("json-visualizer", element.textContent);
}

export function format(json) {
  return json
    .split("")
    .map((char) => char)
    .join("");
}
