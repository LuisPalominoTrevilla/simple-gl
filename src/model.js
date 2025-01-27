class Model {
  constructor({
    vertices,
    indices,
    shader,
    primitive = Constants.primitives.points,
    color = [1, 1, 1, 1],
  }) {
    this.vertices = vertices;
    this.indices = indices;
    this.position = [0, 0, 0];
    this.scaling = [1, 1, 1];
    this.rotationAxis = [0, 0, 0];
    this.rotationAngle = 0;
    this.sQ = [0, 0, 0];
    this.rQ = [0, 0, 0];
    this.primitive = primitive;
    this.color = color;
    this.shader = shader;
    this.matrix = glMatrix.mat4.create();
    this.id = this._uniqueID();
  }

  /**
   * DO NOT USE DIRECTLY.
   * Generates a unique id for the object.
   * Retrieved from discussion: https://gist.github.com/gordonbrander/2230317
   */
  _uniqueID() {
    const chr4 = () => Math.random().toString(16).slice(-4);
    return `${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
  }

  /**
   * DO NOT USE DIRECTLY!
   * Registers a renderer to be used with the model.
   * @param {Renderer} renderer
   */
  registerRenderer(renderer) {
    this.renderer = renderer;
    this.renderer.registerComponent(this);
  }

  /**
   * DO NOT USE DIRECTLY!
   * Unregisters from its renderer.
   * @param {Renderer} renderer
   */
  unregisterRenderer() {
    if (!this.renderer) return;
    this.renderer.unregisterComponent(this);
  }

  /**
   * Replaces the model's vertices and indices.
   * @param {Array<Number>} vertices
   * @param {Array<Number>} indices
   */
  replaceCoordinates(vertices, indices) {
    this.vertices = vertices;
    this.indices = indices;
  }

  /**
   * Translates the model's position by the amount of units.
   * @param {Number} xUnits - Amount of units in x axis.
   * @param {Number} yUnits - Amount of units in y axis.
   * @param {Number} zUnits - Amount of units in z axis.
   * @return {Model} The model.
   */
  translate(xUnits, yUnits = 0, zUnits = 0) {
    return this.setPosition({
      x: this.position[0] + xUnits,
      y: this.position[1] + yUnits,
      z: this.position[2] + zUnits,
    });
  }

  /**
   * Sets position of the model. If a unit is missing, it uses the model's current position.
   * @param {Object} position - Holds x, y and z values for the position.
   * @return {Model} The model.
   */
  setPosition(position) {
    this.position[0] = position.x ?? this.position[0];
    this.position[1] = position.y ?? this.position[1];
    this.position[2] = position.z ?? this.position[2];
    glMatrix.mat4.translate(this.matrix, this.matrix, this.position);
    return this;
  }

  /**
   * Rotates the model on a specified axis by an amount of degrees.
   * @param {Number} deg - The degrees to rotate by.
   * @param {Array.<Number>} axis - The rotation axis.
   * @return {Model} The model.
   */
  rotate(deg, axis) {
    this.rotationAngle = ((deg * Math.PI) / 180) % 360;
    this.rotationAxis[0] = axis[0];
    this.rotationAxis[1] = axis[1];
    this.rotationAxis[2] = axis[2];
    glMatrix.mat4.translate(this.matrix, this.matrix, this.rQ);
    glMatrix.mat4.rotate(
      this.matrix,
      this.matrix,
      this.rotationAngle,
      this.rotationAxis
    );
    glMatrix.mat4.translate(
      this.matrix,
      this.matrix,
      this.rQ.map((_) => -_)
    );
    return this;
  }

  /**
   * Sets the model to rotate about a point q.
   * @param {Object} q - Holds x, y and z values
   */
  rotateAbout(q) {
    this.rQ[0] = q.x ?? 0;
    this.rQ[1] = q.y ?? 0;
    this.rQ[2] = q.z ?? 0;
  }

  /**
   * Scales the model by the amount of units.
   * @param {Number} xUnits - Amount of units in x axis greater than 0.
   * @param {Number} yUnits - Amount of units in y axis greater than 0.
   * @param {Number} zUnits - Amount of units in z axis greater than 0.
   * @return {Model} The model.
   */
  scale(xUnits, yUnits = 1, zUnits = 1) {
    return this.setScaling({
      x: this.scaling[0] * xUnits,
      y: this.scaling[1] * yUnits,
      z: this.scaling[2] * zUnits,
    });
  }

  /**
   * Sets scaling of the model by an amount of units.
   * If a unit is missing, it uses the model's current scaling.
   * @param {*} scaling - Holds x, y and z values for the scaling.
   */
  setScaling(scaling) {
    this.scaling[0] = scaling.x ?? this.scaling[0];
    this.scaling[1] = scaling.y ?? this.scaling[1];
    this.scaling[2] = scaling.z ?? this.scaling[2];
    glMatrix.mat4.translate(this.matrix, this.matrix, this.sQ);
    glMatrix.mat4.scale(this.matrix, this.matrix, this.scaling);
    glMatrix.mat4.translate(
      this.matrix,
      this.matrix,
      this.sQ.map((_) => -_)
    );
    return this;
  }

  /**
   * Sets the model to scale about a point q.
   * @param {Object} q - Holds x, y and z values
   */
  scaleAbout(q) {
    this.sQ[0] = q.x ?? 0;
    this.sQ[1] = q.y ?? 0;
    this.sQ[2] = q.z ?? 0;
  }

  /**
   * DO NOT USE DIRECTLY!
   * Updates and renders the model in the scene.
   */
  render(camera) {
    if (!this.renderer) throw new Error("Component doesn't have a renderer");
    this.renderer.update(this, camera);
    this.renderer.render(this);
  }
}
