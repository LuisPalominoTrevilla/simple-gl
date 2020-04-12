class PerspectiveCamera extends Camera {
  constructor({ fovyDeg, aspect, near, far }) {
    super();
    this.setProjection(fovyDeg, aspect, near, far);
  }

  setProjection(fovyDeg, aspect, near, far) {
    const fovy = (fovyDeg * Math.PI) / 180;
    glMatrix.mat4.perspective(this.projMatrix, fovy, aspect, near, far);
  }
}
