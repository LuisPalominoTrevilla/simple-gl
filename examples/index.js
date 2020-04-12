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
    vertices: [1, 1.5, 0, 0.5, 0, 0, 1.5, 0, 0],
    indices: [0, 1, 2],
    primitive: Constants.primitives.triangles,
    shader,
  });

  const rect = new Rectangle({
    width: 2,
    height: 5,
    shader,
    origin: [3, 0, 0],
  });
  rect.setRotation(60, [0, 1, 1]);

  const trig = new Triangle({
    p0: [1, 0, 0],
    p1: [2, 0, 0],
    p2: [2, 4, 0],
    shader,
    wireframe: true,
  });

  //scene.addComponent(triangle);
  scene.addComponent(trig);
  camera.zoom(-5);
  requestAnimationFrame(update);
}

function update() {
  camera.rotate(.3, [0,1,0]);
  scene.render();
  requestAnimationFrame(update);
}
