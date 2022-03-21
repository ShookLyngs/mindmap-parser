import { FontData, StrokeData } from '@svgdotjs/svg.js';


export interface NodeSpace {
  x: number;
  y: number;
}
export interface NodeStyle {
  margin: NodeSpace;
  padding: NodeSpace;
  lineStroke: StrokeData;
  backgroundColor: string;
  backgroundRadius: number;
  backgroundStroke: StrokeData;
  textFont: FontData;
}

export interface NodeTheme {
  normal: NodeStyle;
  columns: Record<number, NodeStyle>;
}

export const normalNodeStyle: NodeStyle = {
  padding: {
    x: 12,
    y: 4,
  },
  margin: {
    x: 20,
    y: 10,
  },
  lineStroke: {
    width: 2,
    color: '#333',
  },
  backgroundStroke: {
    width: 1,
    color: '#d7d7d7',
  },
  backgroundRadius: 6,
  backgroundColor: '#fff',
  textFont: {},
};

export const rootNodeStyle: NodeStyle = {
  padding: {
    x: 20,
    y: 8,
  },
  margin: {
    x: 30,
    y: 10,
  },
  lineStroke: {
    width: 2,
    color: '#333',
  },
  backgroundStroke: {
    width: 2,
    color: '#2a3ada',
  },
  backgroundRadius: 6,
  backgroundColor: '#fff',
  textFont: {
    size: '1.2em',
  },
};

export const normalNodeTheme: NodeTheme = {
  normal: normalNodeStyle,
  columns: {
    0: rootNodeStyle,
  },
};

export function createNodeTheme(theme: Partial<NodeTheme>) {
  return {
    normal: {
      ...normalNodeTheme.normal,
      ...theme.normal,
    },
    columns: {
      ...normalNodeTheme.columns,
      ...theme.columns,
    },
  };
}