import { Svg, SVG } from '@svgdotjs/svg.js';
import { getElement, Selector } from '../utils/element';
import { RawNode, RenderNode } from './render-node';

interface MindmapParser {
  canvas: Svg;
  node: RenderNode;
  update(raw: RawNode): void;
}

export interface CreateMindmapParserParams<T extends Selector> {
  root: RawNode;
  selector: T;
}

export function createMindmapParser<T extends Selector>({ selector, root }: CreateMindmapParserParams<T>) {
  const canvas = createCanvas(getElement(selector));
  const node = new RenderNode({
    raw: root,
    parent: canvas,
  });

  return {
    canvas,
    node,
  };
}

export function createCanvas<T extends HTMLElement>(element: T) {
  const canvas = SVG();

  canvas.size(element.offsetWidth, element.offsetHeight);
  canvas.addTo(element);
  return canvas;
}