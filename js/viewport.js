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

    viewport.classList.add("grabbing");
  });

  viewport.addEventListener("mouseup", function (e) {
    isHeld = false;
    viewport.classList.remove("grabbing");
  });

  viewport.addEventListener("mouseout", function (e) {
    isHeld = false;
    viewport.classList.remove("grabbing");
  });

  viewport.addEventListener("mousemove", function (e) {
    if (isHeld) {
      viewport.classList.add("grabbing");

      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      viewport.scrollTop = pos.top - dy;
      viewport.scrollLeft = pos.left - dx;
    }
  });
}
