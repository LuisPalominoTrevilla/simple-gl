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
    this.renderer = new Renderer(this.gl);
  }

  /**
   * Adds a component to the scene.
   * @param {Model} component - Component to add
   */
  addComponent(component) {
    component.registerRenderer(this.renderer);
    this.components.push(component);
  }

  /**
   * Removes component from the scene.
   * @param {Model} component
   */
  removeComponent(component) {
    this.components.filter((_) => _ !== component);
    this.renderer.unregisterComponent(component);
  }

  /**
   * Renders the scene.
   */
  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    for (let component of this.components) {
      component.render(this.camera);
    }
  }
}
