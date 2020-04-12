function mouseDownEventListener(event) {
  dragging = true;
  let x = event.clientX;
  let y = event.clientY;
  let rect = event.target.getBoundingClientRect();
  x = x - rect.left;
  y = y - rect.top;
  xLast = x;
  yLast = y;
}

function mouseUpEventListener(event) {
  dragging = false;
}

function mouseMoveEventListener(event) {
  if (dragging) {
    let x = event.clientX;
    let y = event.clientY;
    let rect = event.target.getBoundingClientRect();
    x = x - rect.left;
    y = y - rect.top;

    let factor = 2 / canvas.height;
    factor = factor * 100;
    const dx = factor * (x - xLast);
    const dy = factor * (y - yLast);
    rotX = Math.max(Math.min(rotX + dy, 90), -90);
    rotY = rotY + dx;

    xLast = x;
    yLast = y;

    camera.resetRotation();
    camera.rotate(rotX, [1, 0, 0]);
    camera.rotate(rotY, [0, 1, 0]);
  }
}

function initEventHandler() {
  document.addEventListener("mousedown", mouseDownEventListener, false);
  document.addEventListener("mouseup", mouseUpEventListener, false);
  document.addEventListener("mousemove", mouseMoveEventListener, false);
}
