export default class Text {
  constructor(text) {
    this.element = document.createElement("div");

    const span = document.createElement("span");
    span.innerText =
      typeof text === "string" ? `"${text}"` : text === null ? "null" : text;

    this.element.appendChild(span);
  }
}
