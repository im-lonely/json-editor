export default class Root {
  constructor() {
    this.element = document.createElement("div");
  }

  attach(parent) {
    parent.appendChild(this.element);
  }

  append(child) {
    this.element.appendChild(child.element);
  }
}
