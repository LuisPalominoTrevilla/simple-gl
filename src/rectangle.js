class Rectangle extends Model {
  constructor({
    width,
    height,
    shader,
    origin = [0, 0, 0],
    wireframe = false,
    color,
    zyOrientation = false,
  }) {
    let x0, x1, x2, x3, y0, y1, y2, y3, z0, z1, z2, z3;
    if (!zyOrientation) {
      [x0, y0] = [origin[0], origin[1]];
      [x1, y1] = [origin[0] + width, origin[1]];
      [x2, y2] = [origin[0] + width, origin[1] + height];
      [x3, y3] = [origin[0], origin[1] + height];
      [z0, z1, z2, z3] = [origin[2], origin[2], origin[2], origin[2]];
    } else {
      [z0, y0] = [origin[2], origin[1]];
      [z1, y1] = [origin[2] + width, origin[1]];
      [z2, y2] = [origin[2] + width, origin[1] + height];
      [z3, y3] = [origin[2], origin[1] + height];
      [x0, x1, x2, x3] = [origin[0], origin[0], origin[0], origin[0]];
    }
    const data = {
      vertices: [x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3],
      indices: wireframe ? [0, 1, 2, 3] : [0, 1, 3, 1, 2, 3],
      primitive: wireframe
        ? Constants.primitives.lineLoop
        : Constants.primitives.triangles,
      shader,
      color,
    };
    super(data);
  }
}
