function main() {
  scene = new Scene("canvas");

  shader = new Shader();

  triangle = new Model({
    vertices: [0, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0],
    indices: [0, 1, 2],
    primitive: Constants.primitives.triangles,
    shader,
  });

  scene.addComponent(triangle);
  scene.render();
}
