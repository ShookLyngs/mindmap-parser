import { Svg, SVG } from '@svgdotjs/svg.js';
import { RawNode, RenderNode } from '../node/node';
import { getElement, Selector } from '../utils/element';

export interface MindmapParser<T extends HTMLElement> {
  node: RenderNode;
  element: T;
  canvas: Svg;
  resize: () => void;
  moveToCenter: () => void;
  setElement: (element: T) => void;
}

export interface CreateMindmapParserParams<T extends Selector> {
  root: RawNode;
  selector: T;
}

export function createMindmapParser<T extends Selector>({ selector, root }: CreateMindmapParserParams<T>): MindmapParser<T extends HTMLElement ? T : HTMLElement> {
  const canvas = createCanvas(getElement(selector) as (T extends HTMLElement ? T : HTMLElement));

  const node = new RenderNode({
    parent: canvas.canvas,
    raw: root,
  });

  function moveToCenter() {
    const { offsetWidth, offsetHeight } = canvas.element;
    node.group.center(offsetWidth / 2, offsetHeight / 2);
  }
  function resize() {
    canvas.resize(canvas.element);
    moveToCenter();
  }

  return {
    ...canvas,
    node,
    resize,
    moveToCenter,
  };
}

export function createCanvas<T extends HTMLElement>(element: T) {
  const canvas = SVG();

  canvas.size(element.offsetWidth, element.offsetHeight);
  canvas.addTo(element);

  function setElement(element: T) {
    canvas.remove();
    canvas.addTo(element);
    canvas.size(element.offsetWidth, element.offsetHeight);
  }
  function resize(element: T) {
    canvas.size(element.offsetWidth, element.offsetHeight);
  }
  function bindEvent() {
    canvas.on('mousedown', onMouseDown);
    canvas.on('mouseup', onMouseUp);
    canvas.on('mousemove', onMouseMove);
    canvas.on('wheel', onZoom);
  }

  let move = false;
  function onMouseDown(e: MouseEvent | TouchEvent) {
    move = true;
  }
  function onMouseUp() {
    move = false;
  }
  function onMouseMove(event: MouseEvent) {
    if (move) {
      canvas.children()[0].translate(event.movementX, event.movementY);
    }
  }
  function onZoom(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    canvas.children()[0].scale(event.deltaY < 0 ? 1.1 : 0.9);
  }

  bindEvent();

  return {
    element,
    canvas,
    resize,
    setElement,
  };
}