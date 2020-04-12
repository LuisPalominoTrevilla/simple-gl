class Shader {
  constructor() {
    this.attributes = {};
    this.uniforms = {};
    this.vertexShaderName = "vertex-shader";
    this.fragmentShaderName = "fragment-shader";
    this.vertexPositionName = "aPosition";
    this.modelMatrixName = "uModelMatrix";
    this.viewMatrixName = "uCameraMatrix";
    this.projMatrixName = "uProjMatrix";
    this.vertexColorName = "uColor";
    this.inited = false;
  }

  init(gl) {
    if (this.inited) return;
    this.inited = true;
    this.program = this._createShaderProgram(
      gl,
      this.vertexShaderName,
      this.fragmentShaderName
    );
    this.use(gl);
    this.attributes["vertexPosition"] = gl.getAttribLocation(
      this.program,
      this.vertexPositionName
    );
    this.uniforms["modelMatrix"] = gl.getUniformLocation(
      this.program,
      this.modelMatrixName
    );
    this.uniforms["viewMatrix"] = gl.getUniformLocation(
      this.program,
      this.viewMatrixName
    );
    this.uniforms["projMatrix"] = gl.getUniformLocation(
      this.program,
      this.projMatrixName
    );
    this.uniforms["vertexColor"] = gl.getUniformLocation(
      this.program,
      this.vertexColorName
    );
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
