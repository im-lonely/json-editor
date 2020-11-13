import { input } from "./main.js";

const braces = ["{", "[", "}", "]"];

export default function init() {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      e.preventDefault();
      insert("\t");
    } else if (
      braces
        .slice(0, (braces.length - 1) / 2)
        .includes(this.textContent[getPos(input) - 1]) &&
      e.key === "Enter"
    ) {
      e.preventDefault();
      const sel = document.getSelection();

      const tabs = sel.anchorNode.textContent
        .slice(0, sel.focusOffset)
        .match(/\t/g);

      const length = tabs?.length || 0;

      const indent = new Array(length + 1)
        .fill(" ")
        .map((_) => "\t")
        .join("");

      insert(`\n${indent}`);
    } else if (braces.slice((braces.length - 1) / 2).includes(e.key)) {
      document.execCommand("delete");
      this.focus();
    }
  });

  function insert(text) {
    const sel = input.ownerDocument.defaultView.getSelection();
    const range = sel.getRangeAt(0);

    const tabNode = document.createTextNode(text);

    range.insertNode(tabNode);

    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function move(amount) {
    let sel;
    let range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount > 0) {
        let textNode = sel.focusNode;
        let newOffset = sel.focusOffset + amount;
        sel.collapse(textNode, Math.min(textNode.length, newOffset));
      }
    } else if ((sel = window.document.selection)) {
      if (sel.type != "Control") {
        range = sel.createRange();
        range.move("character", amount);
        range.select();
      }
    }
  }

  function getPos(element) {
    element.focus();
    let _range = document.getSelection().getRangeAt(0);
    let range = _range.cloneRange();
    range.selectNodeContents(element);
    range.setEnd(_range.endContainer, _range.endOffset);
    return range.toString().length;
  }
}
