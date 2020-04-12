class Camera {
  constructor({ eye = [0, 0, 1], target = [0, 0, 0], up = [0, 1, 0] }) {
    this.eye = eye;
    this.target = target;
    this.up = up;
    this.viewMatrix = glMatrix.mat4.create();
    this.projMatrix = glMatrix.mat4.create();
    this._updateMatrix();
  }

  _updateMatrix() {
    glMatrix.mat4.lookAt(this.viewMatrix, this.eye, this.target, this.up);
  }

  /**
   * Resets camera rotation.
   */
  resetRotation() {
    this.viewMatrix = glMatrix.mat4.create();
    this._updateMatrix();
  }

  /**
   * Zooms the camera in or out. Target doesn't move.
   * @param {Number} magnitude - Positive magnitude means zoom in. Negative, zoom out.
   * @return {Camera} The camera.
   */
  zoom(magnitude) {
    this.eye[2] -= magnitude;
    this._updateMatrix();
    return this;
  }

  /**
   * Pans the camera in x or y direction.
   * It translates the camera's position and its target.
   * @param {Number} unitsX - Units to pan the camera in x.
   * @param {Number} unitsY - Units to pan the camera in y.
   * @return {Camera} The camera.
   */
  pan({ unitsX = 0, unitsY = 0 }) {
    this.eye[0] += unitsX;
    this.eye[1] += unitsY;
    this.target[0] += unitsX;
    this.target[1] += unitsY;
    this._updateMatrix();
    return this;
  }

  /**
   * Sets the target of the camera.
   * If a parameter is missing, the method
   * will use the current target.
   * @param {Number} x - The target's x position.
   * @param {Number} y - The target's y position.
   * @param {Number} z - The target's z position.
   * @return {Camera} The camera.
   */
  lookAt({ x = this.target[0], y = this.target[1], z = this.target[2] }) {
    this.target[0] = x;
    this.target[1] = y;
    this.target[2] = z;
    this._updateMatrix();
    return this;
  }

  /**
   * Sets camera position.
   * If a parameter is missing, the method
   * will use the current position
   * @param {Number} x - The camera's x coordinate.
   * @param {Number} y - The camera's x coordinate.
   * @param {Number} z - The camera's x coordinate.
   * @return {Camera} The camera.
   */
  setPosition({ x = this.eye[0], y = this.eye[1], z = this.eye[2] }) {
    this.eye[0] = x;
    this.eye[1] = y;
    this.eye[2] = z;
    this._updateMatrix();
    return this;
  }

  /**
   * Rotates the camera in a specified angle around specified axis.
   * @param {Number} deg - The degrees to rotate the camera.
   * @param {*} axis - The axis to rotate the camera around.
   * @return {Camera} - The camera.
   */
  rotate(deg, axis) {
    const angle = ((deg * Math.PI) / 180) % 360;
    glMatrix.mat4.rotate(this.viewMatrix, this.viewMatrix, angle, axis);
    return this;
  }
}
