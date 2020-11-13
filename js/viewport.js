export default function init() {
  const viewport = document.getElementById("viewport");

  let isHeld = false;

  const pos = { top: 0, left: 0, x: 0, y: 0 };

  viewport.addEventListener("mousedown", function (e) {
    isHeld = true;

    pos.left = viewport.scrollLeft;
    pos.top = viewport.scrollTop;
    pos.x = e.clientX;
    pos.y = e.clientY;

    this.classList.add("grabbing");
  });

  viewport.addEventListener("mouseup", function (e) {
    isHeld = false;
    this.classList.remove("grabbing");
  });

  viewport.addEventListener("mouseout", function (e) {
    isHeld = false;
    this.classList.remove("grabbing");
  });

  viewport.addEventListener("mousemove", function (e) {
    if (isHeld) {
      this.classList.add("grabbing");

      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      this.scrollTop = pos.top - dy;
      this.scrollLeft = pos.left - dx;
    }
  });

  viewport.addEventListener("touchstart", function (e) {
    isHeld = true;

    pos.left = viewport.scrollLeft;
    pos.top = viewport.scrollTop;
    pos.x = e.clientX;
    pos.y = e.clientY;

    this.classList.add("grabbing");
  });

  viewport.addEventListener("touchend", function (e) {
    isHeld = false;
    this.classList.remove("grabbing");
  });

  viewport.addEventListener("touchmove", function (e) {
    if (isHeld) {
      this.classList.add("grabbing");

      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      this.scrollTop = pos.top - dy;
      this.scrollLeft = pos.left - dx;
    }
  });

  viewport.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
}
