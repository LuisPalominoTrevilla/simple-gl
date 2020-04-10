class Rectangle extends Model {
  constructor({
    width,
    height,
    shader,
    origin = [0, 0, 0],
    wireframe = false,
  }) {
    const [x0, y0] = [origin[0] - width / 2, origin[1] - height / 2];
    const [x1, y1] = [origin[0] + width / 2, origin[1] - height / 2];
    const [x2, y2] = [origin[0] + width / 2, origin[1] + height / 2];
    const [x3, y3] = [origin[0] - width / 2, origin[1] + height / 2];
    const data = {
      vertices: [
        x0,
        y0,
        origin[2],
        x1,
        y1,
        origin[2],
        x2,
        y2,
        origin[2],
        x3,
        y3,
        origin[2],
      ],
      indices: wireframe ? [0, 1, 2, 3] : [0, 1, 3, 1, 2, 3],
      primitive: wireframe
        ? Constants.primitives.lineLoop
        : Constants.primitives.triangles,
      shader,
    };
    super(data);
  }
}
