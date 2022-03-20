import { RenderNode } from './node';
import { G, Rect } from '@svgdotjs/svg.js';

export class RenderContentNode {
  parent: RenderNode;
  node: G;

  get context() {
    return this.parent.context;
  }
  get content() {
    return this.parent.content;
  }
  get column() {
    return this.parent.column;
  }
  get size() {
    return this.bbox();
  }

  constructor(parent: RenderNode) {
    this.parent = parent;
    this.render();
  }

  render() {
    // Remove old content node
    this.remove();

    // Create new group
    this.node = this.parent.group.group();
    this.node.addClass('node-content');

    // Create text node
    const text = this.node.text(this.content);

    // Get text box size
    const size = text.bbox();

    // Get NodeStyle
    const { padding, backgroundColor } = this.context.theme.normal;

    // Create background node, insert before text node
    const background = new Rect({
      x: size.x,
      y: size.y,
      width: Math.ceil(size.width + padding.x * 2),
      height: Math.ceil(size.height + padding.y * 2),
    });

    // Style background node
    background.radius(padding.x);
    background.fill(backgroundColor);

    // Insert before text node
    this.node.add(background, 0);

    // Move text node to the center of the background node
    const backgroundSize = background.bbox();
    text.center(backgroundSize.cx, backgroundSize.cy);
  }

  remove() {
    const content = this.parent.group.findOne('.node-content');
    if (content) content.remove();
  }

  bbox() {
    return this.node.bbox();
  }
  move(x: number, y: number) {
    return this.node.move(x, y);
  }
  x(x: number) {
    return this.node.x(x);
  }
  y(y: number) {
    return this.node.y(y);
  }
  center(x: number, y: number) {
    return this.node.center(x, y);
  }
  cx(x: number) {
    return this.node.cx(x);
  }
  cy(y: number) {
    return this.node.cy(y);
  }
}