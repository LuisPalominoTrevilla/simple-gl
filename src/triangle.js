class Triangle extends Model {
  constructor({ p0, p1, p2, wireframe = false, shader }) {
    const data = {
      vertices: [...p0, ...p1, ...p2],
      indices: [0, 1, 2],
      primitive: wireframe
        ? Constants.primitives.lineLoop
        : Constants.primitives.triangles,
      shader,
    };
    console.log(data);
    super(data);
  }
}