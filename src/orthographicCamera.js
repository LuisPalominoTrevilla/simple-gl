class OrthographicCamera extends Camera {
  constructor({ left, right, bottom, top, near, far, eye, target, up }) {
    super({ eye, target, up });
    this.setProjection(left, right, bottom, top, near, far);
  }

  setProjection(left, right, bottom, top, near, far) {
    glMatrix.mat4.ortho(this.projMatrix, left, right, bottom, top, near, far);
  }
}
