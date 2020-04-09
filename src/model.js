class Model {
  constructor(data) {
    this.vertices = data.vertices;
    this.indices = data.indices;
    this.position = [0, 0, 0];
    this.scaling = [1, 1, 1];
    this.sQ = [0, 0, 0];
    this.rotationAxis = [0, 0, 0];
    this.rotationAngle = 0;
    this.rQ = [0, 0, 0];
    this.primitive = data.primitive || Constants.primitives.points;
    this.matrix = glMatrix.mat4.create();
    this.shader = data.shader;
  }

  init(gl) {
    this.shader.init(gl);
    this.renderer = new Renderer(gl, this);
  }

  /**
   * Translates the model's position by the amount of units.
   * @param {number} xUnits - Amount of units in x axis.
   * @param {number} yUnits - Amount of units in y axis.
   * @param {number} zUnits - Amount of units in z axis.
   * @return {Model} The model.
   */
  translate(xUnits = 0, yUnits = 0, zUnits = 0) {
    this.position[0] += xUnits;
    this.position[1] += yUnits;
    this.position[2] += zUnits;
    glMatrix.mat4.translate(this.matrix, this.matrix, this.position);
    return this;
  }

  /**
   * Rotates the model on a specified axis by an amount of degrees.
   * @param {number} deg - The degrees to rotate by.
   * @param {Array.<number>} axis - The rotation axis.
   * @return {Model} The model.
   */
  rotate(deg, axis) {
    this.rotationAngle = (this.rotationAngle + (deg * Math.PI) / 180) % 360;
    this.rotationAxis[0] = axis[0];
    this.rotationAxis[1] = axis[1];
    this.rotationAxis[2] = axis[2];
    glMatrix.mat4.rotate(
      this.matrix,
      this.matrix,
      this.rotationAngle,
      this.rotationAxis
    );
    return this;
  }

  /**
   * Scales the model by the amount of units.
   * @param {number} xUnits - Amount of units in x axis greater than 0.
   * @param {number} yUnits - Amount of units in y axis greater than 0.
   * @param {number} zUnits - Amount of units in z axis greater than 0.
   * @return {Model} The model.
   */
  scale(xUnits = 1, yUnits = 1, zUnits = 1) {
    this.scaling[0] *= xUnits;
    this.scaling[1] *= yUnits;
    this.scaling[2] *= zUnits;
    glMatrix.mat4.scale(this.matrix, this.matrix, this.scaling);
    return this;
  }

  update() {
    if (!this.renderer)
      throw new Error("Component hasn't been initialized yet");
    this.renderer.update(this);
  }

  render() {
    if (!this.renderer)
      throw new Error("Component hasn't been initialized yet");
    this.renderer.render(this);
  }
}
