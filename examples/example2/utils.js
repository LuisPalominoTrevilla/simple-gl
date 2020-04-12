function createTree(shader) {
  const bottomLeafsPos = [
    [-1, 1, 0],
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, -1],
  ];
  const topLeafsPos = [
    [-0.8, 1.8, 0],
    [0, 1.8, 0.8],
    [0.8, 1.8, 0],
    [0, 1.8, -0.8],
  ];

  const bottomLeafs = bottomLeafsPos.map(
    (p0) =>
      new Triangle({
        p0,
        p1: [0, 1, 0],
        p2: [0, 2, 0],
        shader,
        color: [0, 1, 0, 1],
      })
  );
  const topLeafs = topLeafsPos.map(
    (p0) =>
      new Triangle({
        p0,
        p1: [0, 1.8, 0],
        p2: [0, 2.8, 0],
        shader,
        color: [0, 1, 0, 1],
      })
  );
  const trunk = new Triangle({
    p0: [-0.5, 0, 0],
    p1: [0.5, 0, 0],
    p2: [0, 1, 0],
    shader,
    color: [0.4, 0.2, 0.1, 1],
  });
  const tree = new CompoundModel();
  tree.addChildren([...topLeafs, ...bottomLeafs]);
  tree.addChild(trunk);
  return tree;
}

function createHouse(shader) {
  const wall = new Rectangle({
    width: 3,
    height: 2.5,
    shader,
    color: [0.71, 0.62, 0.42, 1],
  });
  const wall2 = new Rectangle({
    width: 3,
    height: 2.5,
    shader,
    color: [0.71, 0.62, 0.42, 1],
    origin: [0, 0, -2],
  });
  const wall3 = new Rectangle({
    width: 2,
    height: 2.5,
    shader,
    color: [0.71, 0.62, 0.42, 1],
    zyOrientation: true,
    origin: [0, 0, -2],
  });
  const wall4 = new Rectangle({
    width: 2,
    height: 2.5,
    shader,
    color: [0.71, 0.62, 0.42, 1],
    zyOrientation: true,
    origin: [3, 0, -2],
  });
  const door = new Rectangle({
    width: 0.6,
    height: 1,
    shader,
    color: [0.4, 0.2, 0.1, 1],
    zyOrientation: true,
    origin: [0, 0, -1.3],
  });
  const roof = new Model({
    vertices: [
      0,
      2.5,
      0,
      3,
      2.5,
      0,
      3,
      4,
      -1,
      0,
      4,
      -1,
      3,
      2.5,
      -2,
      0,
      2.5,
      -2,
    ],
    indices: [0, 1, 2, 0, 2, 3, 3, 2, 4, 3, 4, 5],
    shader,
    primitive: Constants.primitives.triangles,
    color: [0.55, 0.125, 0.04, 1],
  });

  const house = new CompoundModel();
  house.addChildren([wall, wall2, wall3, wall4, door, roof]);
  return house;
}
