import { G, Svg } from '@svgdotjs/svg.js';
import { NodeTheme, normalNodeTheme } from './node-style';

export interface CreateRenderNodeContextParams {
  canvas: Svg;
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