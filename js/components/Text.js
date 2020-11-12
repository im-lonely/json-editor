export default class Text {
  constructor(text) {
    this.element = document.createElement("div");

    const span = document.createElement("span");
    span.innerText =
      text === null
        ? "null"
        : typeof text === "object" && !Object.keys(text).length
        ? ""
        : JSON.stringify(text);

    this.element.appendChild(span);

    this.element.style.marginLeft = 64;
  }
}
