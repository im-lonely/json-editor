import { input } from "./main.js";

export default function init() {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();

      const sel = input.ownerDocument.defaultView.getSelection();
      const range = sel.getRangeAt(0);
      const tabNode = document.createTextNode("    ");
      range.insertNode(tabNode);
      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
}
