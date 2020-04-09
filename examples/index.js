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
  triangle.translate(.2,0,0);
  triangle.rotate(30, [0,0,1]);
  triangle.scale(1, .5);
  scene.render();
}
