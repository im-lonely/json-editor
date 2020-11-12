export default class Root {
  constructor() {
    this.element = document.createElement("div");
    this.element.style.marginLeft = 64;
  }

  attach(parent) {
    parent.appendChild(this.element);
  }

  append(child) {
    this.element.appendChild(child.element);
  }
}
