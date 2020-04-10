var triangle, scene;

function main() {
  const canvas = document.querySelector("#canvas");
  const camera = new PerspectiveCamera(
    60,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  scene = new Scene(canvas, camera);

  const shader = new Shader();

  triangle = new Model({
    vertices: [1, 1.5, 0, 0.5, 0, 0, 1.5, 0, 0],
    indices: [0, 1, 2],
    primitive: Constants.primitives.triangles,
    shader,
  });

  scene.addComponent(triangle);
  camera.zoom(-8);
  //triangle.setPosition({ x: 6, y: 3, z: 0 });
  // triangle.rotateAbout({ x: 1.3, y: 0.4 });
  camera.pan(3);
  requestAnimationFrame(render);
  triangle.replaceCoordinates(
    [0, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0],
    [0, 1, 2]
  );
  scene.render();
}

function render() {
  scene.render();
  triangle.setRotation(-5, [0, 0, 1]);
  requestAnimationFrame(render);
}
