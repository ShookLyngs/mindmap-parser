import { StrokeData } from '@svgdotjs/svg.js';


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
};

export const normalNodeTheme: NodeTheme = {
  normal: normalNodeStyle,
  columns: {},
};

export function createNodeTheme(theme: Partial<NodeTheme>) {
  return {
    normal: theme.normal ?? normalNodeTheme.normal,
    columns: theme.columns ?? normalNodeTheme.columns,
  };
}