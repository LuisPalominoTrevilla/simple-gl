class Scene {
  constructor(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    this.gl = this.canvas.getContext("webgl");
    if (this.gl === null) throw new Error("Unable to initialize WebGL");

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.components = [];
  }

  addComponent(component) {
    component.init(this.gl);
    this.components.push(component);
  }

  render() {
    for (let component of this.components) {
      component.update(this.camera);
      component.render();
    }
  }
}
