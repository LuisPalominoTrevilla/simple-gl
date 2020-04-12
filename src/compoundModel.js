class CompoundModel {
  constructor() {
    this.children = [];
    this.inited = false;
  }

  /**
   * DO NOT USE DIRECTLY!
   * Registers a renderer for each child model.
   * @param {Renderer} renderer
   */
  registerRenderer(renderer) {
    this.inited = true;
    for (let model of this.children) {
      model.registerRenderer(renderer);
    }
  }

  /**
   * DO NOT USE DIRECTLY!
   * Unregisters all children models from their renderer.
   * @param {Renderer} renderer
   */
  unregisterRenderer() {
    for (let model of this.children) {
      model.unregisterRenderer();
    }
  }

  /**
   * Adds child model to the compound component.
   * @param {Model} model - The model to add.
   */
  addChild(model) {
    this.children.push(model);
  }

  /**
   * Adds many children model at once to the compound component.
   * @param {Array<Model>} model - The models to add.
   */
  addChildren(models) {
    this.children.push(...models);
  }

  /**
   * Removes child model from the compound component.
   * @param {Model} model - The model to remove.
   */
  removeChild(model) {
    this.children = this.children.filter(_ => _ !== model);
  }

  /**
   * Translates each model's position by the amount of units.
   * @param {Number} xUnits - Amount of units in x axis.
   * @param {Number} yUnits - Amount of units in y axis.
   * @param {Number} zUnits - Amount of units in z axis.
   * @return {Model} The model.
   */
  translate(xUnits, yUnits = 0, zUnits = 0) {
    for (let model of this.children) {
      model.translate(xUnits, yUnits, zUnits);
    }
    return this;
  }

  /**
   * Sets position of each model. If a unit is missing, it uses the model's current position.
   * @param {Object} position - Holds x, y and z values for the position.
   * @return {Model} The model.
   */
  setPosition(position) {
    for (let model of this.children) {
      model.setPosition(position);
    }
    return this;
  }

  /**
   * Sets each model to rotate about a point q.
   * @param {Object} q - Holds x, y and z values
   */
  rotateAbout(q) {
    for (let model of this.children) {
      model.rotateAbout(q);
    }
  }

  /**
   * Scales each model by the amount of units.
   * @param {Number} xUnits - Amount of units in x axis greater than 0.
   * @param {Number} yUnits - Amount of units in y axis greater than 0.
   * @param {Number} zUnits - Amount of units in z axis greater than 0.
   * @return {Model} The model.
   */
  scale(xUnits, yUnits = 1, zUnits = 1) {
    for (let model of this.children) {
      model.scale(xUnits, yUnits, zUnits);
    }
    return this;
  }

  /**
   * Sets scaling of each model by an amount of units.
   * If a unit is missing, it uses the model's current scaling.
   * @param {*} scaling - Holds x, y and z values for the scaling.
   */
  setScaling(scaling) {
    for (let model of this.children) {
      model.setScaling(scaling);
    }
    return this;
  }

  /**
   * Sets each model to scale about a point q.
   * @param {Object} q - Holds x, y and z values
   */
  scaleAbout(q) {
    for (let model of this.children) {
      model.scaleAbout(q);
    }
  }

  /**
   * Rotates each model on a specified axis by an amount of degrees.
   * @param {Number} deg - The degrees to rotate by.
   * @param {Array.<Number>} axis - The rotation axis.
   * @return {Model} The model.
   */
  rotate(deg, axis) {
    for (let model of this.children) {
      model.rotate(deg, axis);
    }
    return this;
  }

  /**
   * DO NOT USE DIRECTLY!
   * Updates and renders each child model in the scene.
   */
  render(camera) {
    for (let model of this.children) {
      model.render(camera);
    }
  }
}