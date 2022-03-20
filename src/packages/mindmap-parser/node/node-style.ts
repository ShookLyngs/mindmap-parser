export interface NodeStyle {
  padding: {
    x: number;
    y: number;
  };
  margin: {
    x: number;
    y: number;
  };
  backgroundColor: string;
}

export interface NodeTheme {
  normal: NodeStyle;
  columns: Record<number, NodeStyle>;
}

export const normalNodeStyle: NodeStyle = {
  padding: {
    x: 10,
    y: 4,
  },
  margin: {
    x: 20,
    y: 10,
  },
  backgroundColor: '#fff',
};

export const normalNodeTheme: NodeTheme = {
  normal: normalNodeStyle,
  columns: {},
};

export interface CreateNodeThemeParams {
  normal: NodeStyle;
  columns?: Record<number, NodeStyle>;
}
export function createNodeTheme(theme: NodeTheme) {
  return {
    normal: theme.normal
  };
}