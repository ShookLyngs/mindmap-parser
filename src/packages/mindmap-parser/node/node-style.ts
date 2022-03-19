export interface NodeStyle {
  padding: {
    x: number;
    y: number;
  };
  margin: {
    x: number;
    y: number;
  };
}

export const normalNodeStyle: NodeStyle = {
  padding: {
    x: 10,
    y: 4,
  },
  margin: {
    x: 20,
    y: 8,
  },
};