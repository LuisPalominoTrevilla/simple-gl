function main() {
  const canvas = document.querySelector("#canvas");
  const camera = new PerspectiveCamera(
    60,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  scene = new Scene(canvas, camera);

  shader = new Shader();

  triangle = new Model({
    vertices: [0, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0],
    indices: [0, 1, 2],
    primitive: Constants.primitives.triangles,
    shader,
  });

  scene.addComponent(triangle);
  camera.zoom(-8);
  camera.pan(3);
  scene.render();
}
