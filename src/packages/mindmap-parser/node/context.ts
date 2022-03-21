import { Svg } from '@svgdotjs/svg.js';
import { RenderNode } from './node';
import { NodeTheme, normalNodeTheme } from './node-style';

export interface CreateRenderNodeContextParams {
  canvas: Svg;
  root: RenderNode;
  theme?: NodeTheme;
}
export interface RenderNodeContext extends CreateRenderNodeContextParams {
  theme: NodeTheme;
}

export function createRenderNodeContext(params: CreateRenderNodeContextParams): RenderNodeContext {
  return {
    ...params,
    theme: params.theme ?? normalNodeTheme,
  };
}