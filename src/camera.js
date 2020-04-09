class Camera {
  constructor() {
    this.eye = [0, 0, 1];
    this.target = [0, 0, 0];
    this.up = [0, 1, 0];
    this.viewMatrix = glMatrix.mat4.create();
    this.projMatrix = glMatrix.mat4.create();
    this._updateMatrix();
  }

  _updateMatrix() {
    glMatrix.mat4.lookAt(this.viewMatrix, this.eye, this.target, this.up);
  }

  zoom(magnitude) {
    this.eye[2] -= magnitude;
    this._updateMatrix();
    return this;
  }

  pan(unitsX, unitsY = 0) {
    this.eye[0] += unitsX;
    this.eye[1] += unitsY;
    this.target[0] += unitsX;
    this.target[1] += unitsY;
    this._updateMatrix();
    return this;
  }

  lookAt(target) {
    this.target[0] = target[0];
    this.target[1] = target[1];
    this.target[2] = target[2];
    this._updateMatrix();
    return this;
  }
}
