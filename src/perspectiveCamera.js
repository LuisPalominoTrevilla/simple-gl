class PerspectiveCamera extends Camera {
  constructor(fovyDeg, aspect, near, far) {
    super();
    const fovy = (fovyDeg * Math.PI) / 180;
    glMatrix.mat4.perspective(this.projMatrix, fovy, aspect, near, far);
  }
}
