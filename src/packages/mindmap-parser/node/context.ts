import { Svg } from '@svgdotjs/svg.js';
import { NodeTheme, normalNodeTheme } from './node-style';
import { RenderNode } from '@/packages/mindmap-parser';

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