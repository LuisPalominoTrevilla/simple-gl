let scene, tree, house, camera;
let dragging, rotX, rotY, xLast, yLast;

function main() {
  initEventHandler();

  dragging = false;
  rotX = 0;
  rotY = 0;
  xLast = 0;
  yLast = 0;

  const canvas = document.querySelector("#canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  camera = new PerspectiveCamera({
    fovyDeg: 60,
    aspect: canvas.width / canvas.height,
    near: 1,
    far: 1000,
  });
  scene = new Scene(canvas, camera);

  const shader = new Shader();

  // Create trees
  tree = createTree(shader);
  tree2 = createTree(shader);
  tree3 = createTree(shader);

  tree.setPosition({ x: -4, z: -4 });
  tree2.setPosition({ z: -9 });
  tree3.setPosition({ x: -5, z: 2 });

  // Create house
  house = createHouse(shader);
  house.setPosition({ x: 3, z: 2 });
  house.rotate(20, [0, 1, 0]);

  // Add components to the scene
  scene.addComponent(tree);
  scene.addComponent(tree2);
  scene.addComponent(tree3);
  scene.addComponent(house);

  // Set the camera
  camera.zoom(-8);
  requestAnimationFrame(render);
}

function render() {
  tree.rotate(1, [0, 1, 0]);
  tree2.rotate(1, [0, 1, 0]);
  tree3.rotate(1, [0, 1, 0]);
  scene.render();
  requestAnimationFrame(render);
}
