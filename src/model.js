class Model {
  constructor(data) {
    this.vertices = data.vertices;
    this.indices = data.indices;
    this.position = [0, 0, 0];
    this.scaling = [1, 1, 1];
    this.sQ = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.rQ = [0, 0, 0];
    this.primitive = data.primitive || Constants.primitives.points;
    this.shader = data.shader;
  }

  init(gl) {
    this.shader.init(gl);
    this.renderer = new Renderer(gl, this);
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
