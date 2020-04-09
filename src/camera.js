class Camera {
  constructor() {
    this.eye = [0., 0., 1.];
    this.target = [0., 0., 0.];
    this.up = [0., 1., 0.];
    this.viewMatrix = glMatrix.mat4.create();
  }
}
