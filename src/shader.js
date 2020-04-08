class Shader {
  constructor() {
    this.attributes = {};
    this.uniforms = {};
    this.vertexShaderName = "vertex-shader";
    this.fragmentShaderName = "fragment-shader";
    this.modelMatrixName = "uModelMatrix";
    this.vertexPositionName = "aPosition";
  }

  init(gl) {
    this.program = this._createShaderProgram(
      gl,
      this.vertexShaderName,
      this.fragmentShaderName
    );
    this.use(gl);
    this.uniforms["modelMatrix"] = gl.getUniformLocation(
      this.program,
      this.modelMatrixName
    );
    this.attributes["vertexPosition"] = gl.getAttribLocation(
      this.program,
      this.vertexPositionName
    );
    // Init attributes for camera and proyection
  }

  use(gl) {
    gl.useProgram(this.program);
  }

  _createShaderProgram(gl, vertexShaderName, fragmentShaderName) {
    const vertexShader = this._createShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderName
    );
    const fragmentShader = this._createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderName
    );
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    } else {
      console.log(gl.getShaderInfoLog(program));
      gl.deleteShader(program);
    }
  }

  _createShader(gl, type, sourceName) {
    const source = document.getElementById(sourceName).text;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    } else {
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }
  }

  getAttrib(name) {
    return this.attributes[name];
  }

  getUniform(name) {
    return this.uniforms[name];
  }
}
