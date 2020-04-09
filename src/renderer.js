class Renderer {
  constructor(gl, model) {
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

    this.vbo = gl.createBuffer();
    this.ibo = gl.createBuffer();

    const bufferType = gl.ARRAY_BUFFER;
    gl.bindBuffer(bufferType, this.vbo);
    const vertexPositionLocation = model.shader.getAttrib("vertexPosition");
    const index = vertexPositionLocation;
    const size = 3;
    const type = gl.FLOAT;
    const normalized = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    gl.enableVertexAttribArray(vertexPositionLocation);
  }

  update(model) {
    const vertexBufferType = this.gl.ARRAY_BUFFER;
    const usage = this.gl.STATIC_DRAW;

    this.gl.bindBuffer(vertexBufferType, this.vbo);
    const verticesData = new Float32Array(model.vertices);
    this.gl.bufferData(vertexBufferType, verticesData, usage);

    const IndexBufferType = this.gl.ELEMENT_ARRAY_BUFFER
    this.gl.bindBuffer(IndexBufferType, this.ibo);
    const indicesData = new Uint16Array(model.indices);
    this.gl.bufferData(IndexBufferType, indicesData, usage);

    const modelMatrixLocation = model.shader.getUniform("modelMatrix");
    this.gl.uniformMatrix4fv(modelMatrixLocation, false, model.matrix);
  }

  render(model) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    const primitiveType = this.glPrimitives[model.primitive];
    const count = model.indices.length;
    const type = this.gl.UNSIGNED_SHORT;
    const offset = 0;
    this.gl.drawElements(primitiveType, count, type, offset);
  }
}
