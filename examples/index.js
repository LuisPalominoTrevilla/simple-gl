var triangle, scene, camera;

function main() {
  const canvas = document.querySelector("#canvas");
  camera = new PerspectiveCamera({
    fovyDeg: 60,
    aspect: canvas.width / canvas.height,
    near: 1,
    far: 1000,
  });
  scene = new Scene(canvas, camera);

  const shader = new Shader();

  triangle = new Model({
    vertices: [-0.5, -0.5, 0, 0.5, -0.5, 0, 0, 0.5, 0],
    indices: [0, 1, 2],
    primitive: Constants.primitives.triangles,
    shader,
    color: [0, 1, 0, 0.8],
  });

  const rect = new Rectangle({
    width: 2,
    height: 5,
    shader,
    origin: [3, 0, 0],
    color: [1, 1, 0, 0.8],
  });
  rect.rotate(60, [0, 1, 1]);

  const trig = new Triangle({
    p0: [1, 0, 0],
    p1: [2, 0, 0],
    p2: [2, 4, 0],
    shader,
    wireframe: true,
    color: [0.4, 1, 0.8, 0.8],
  });

  scene.addComponent(trig);
  scene.addComponent(triangle);
  triangle.translate(-1);
  scene.addComponent(rect);
  camera.zoom(-5);
  requestAnimationFrame(update);
}

function update() {
  camera.rotate(0.3, [0, 1, 0]);
  triangle.rotate(-5, [0, 1, 0]);
  scene.render();
  requestAnimationFrame(update);
}
