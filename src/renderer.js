class Renderer {
  constructor(gl) {
    this.gl = gl;
    this.glPrimitives = {
      [Constants.primitives.points]: gl.POINTS,
      [Constants.primitives.lines]: gl.LINES,
      [Constants.primitives.lineLoop]: gl.LINE_LOOP,
      [Constants.primitives.lineStrip]: gl.LINE_STRIP,
      [Constants.primitives.triangles]: gl.TRIANGLES,
      [Constants.primitives.triangleStrip]: gl.TRIANGLE_STRIP,
      [Constants.primitives.triangleFan]: gl.TRIANGLE_FAN,
    };

    this.vertexBuffers = {};
    this.indexBuffers = {};
  }

  registerComponent(model) {
    this._initBuffers(model);
    this._initShader(model.shader);
  }

  _initBuffers(model) {
    this.vertexBuffers[model.id] = this.gl.createBuffer();
    this.indexBuffers[model.id] = this.gl.createBuffer();
  }

  _initShader(shader) {
    shader.init(this.gl);
  }

  unregisterComponent(model) {
    delete this.vertexBuffers[model.id];
    delete this.indexBuffers[model.id];
  }

  /**
   * Prepares to draw a model. Called right before the render function.
   * @param {Model} model - Model that is going to be drawn.
   * @param {Camera} camera - Camera used to draw in the scene.
   */
  update(model, camera) {
    const usage = this.gl.STATIC_DRAW;
    const vbo = this.vertexBuffers[model.id];
    const ibo = this.indexBuffers[model.id];
    if (!vbo || !ibo) return;

    const bufferType = this.gl.ARRAY_BUFFER;
    this.gl.bindBuffer(bufferType, vbo);
    const vertexPositionLocation = model.shader.getAttrib("vertexPosition");
    const index = vertexPositionLocation;
    const size = 3;
    const type = this.gl.FLOAT;
    const normalized = false;
    const stride = 0;
    const offset = 0;
    this.gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    this.gl.enableVertexAttribArray(vertexPositionLocation);

    const vertexBufferType = this.gl.ARRAY_BUFFER;
    this.gl.bindBuffer(vertexBufferType, vbo);
    const verticesData = new Float32Array(model.vertices);
    this.gl.bufferData(vertexBufferType, verticesData, usage);

    const IndexBufferType = this.gl.ELEMENT_ARRAY_BUFFER;
    this.gl.bindBuffer(IndexBufferType, ibo);
    const indicesData = new Uint16Array(model.indices);
    this.gl.bufferData(IndexBufferType, indicesData, usage);

    const modelMatrixLocation = model.shader.getUniform("modelMatrix");
    this.gl.uniformMatrix4fv(modelMatrixLocation, false, model.matrix);

    const viewMatrixLocation = model.shader.getUniform("viewMatrix");
    this.gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix);

    const projMatrixLocation = model.shader.getUniform("projMatrix");
    this.gl.uniformMatrix4fv(projMatrixLocation, false, camera.projMatrix);

    const vertexColorLocation = model.shader.getUniform("vertexColor");
    this.gl.uniform4fv(vertexColorLocation, model.color);
  }

  /**
   * Draw the model in the scene.
   * @param {Model} model - The model to draw.
   */
  render(model) {
    model.shader.use(this.gl);

    const primitiveType = this.glPrimitives[model.primitive];
    const count = model.indices.length;
    const type = this.gl.UNSIGNED_SHORT;
    const offset = 0;
    this.gl.drawElements(primitiveType, count, type, offset);
  }
}
