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

    this._createDomElements();
  }

  /**
   * Inits shader with gl rendering context.
   * Shader must be inited before it can be used.
   * @param {WebGLRenderingContext} gl - The gl rendering context.
   */
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

  _createDomElements() {
    this._createVertexShaderElement();
    this._createFragmentShaderElement();
  }

  _createVertexShaderElement() {
    if (document.getElementById(this.vertexShaderName)) return;
    const vertexShader = `
      attribute vec3 aPosition;
      uniform mat4 uModelMatrix;
      uniform mat4 uCameraMatrix;
      uniform mat4 uProjMatrix;
      void main()
      {
        gl_Position = uProjMatrix * uCameraMatrix * uModelMatrix * vec4(aPosition, 1.);
        gl_PointSize = 10.;
      }
    `;
    const vertexShaderScript = document.createElement("script");
    vertexShaderScript.type = "x-shader/x-vertex";
    vertexShaderScript.id = this.vertexShaderName;
    vertexShaderScript.innerHTML = vertexShader;
    document.body.appendChild(vertexShaderScript);
  }

  _createFragmentShaderElement() {
    if (document.getElementById(this.fragmentShaderName)) return;
    const fragmentShader = `
      precision mediump float;
      uniform vec4 uColor;
      void main()
      {
        gl_FragColor = uColor;
      }
    `;

    const fragmentShaderScript = document.createElement("script");
    fragmentShaderScript.type = "x-shader/x-fragment";
    fragmentShaderScript.id = this.fragmentShaderName;
    fragmentShaderScript.innerHTML = fragmentShader;
    document.body.appendChild(fragmentShaderScript);
  }

  /**
   * Sets current program to be used by gl context
   * @param {WebGLRenderingContext} gl - The gl rendering context
   */
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

  /**
   * Returns location of shader's attribute
   * @param {String} name - Name of the attribute.
   * @return {number} Attrib location.
   */
  getAttrib(name) {
    return this.attributes[name];
  }

  /**
   * Returns location of shader's uniform
   * @param {String} name - Name of the uniform.
   * @return {WebGLUniformLocation} Uniform location.
   */
  getUniform(name) {
    return this.uniforms[name];
  }
}
