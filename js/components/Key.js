import Root from "./Root.js";

export default class Key extends Root {
  constructor(key) {
    super();
    this.element.innerText =  key;
  }
}
