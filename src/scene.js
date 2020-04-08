class Scene {
  constructor(canvasSource) {
    this.canvas = document.querySelector(`#${canvasSource}`);
    if (!this.canvas) throw new Error("Canvas not found");
    this.gl = this.canvas.getContext("webgl");
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    // Might delete later idk
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.components = [];
    this.camera = null;

    if (this.gl === null) throw new Error("Unable to initialize WebGL");
  }

  addComponent(component) {
    component.init(this.gl);
    this.components.push(component);
  }

  render() {
    for (let component of this.components) {
      component.update();
      component.render();
    }
  }
}
