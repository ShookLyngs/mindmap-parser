import { RenderNode } from './node';
import { G, Rect, Text } from '@svgdotjs/svg.js';

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
  get style() {
    return this.parent.style;
  }
  get size() {
    return this.bbox();
  }

  constructor(parent: RenderNode) {
    this.parent = parent;
    this.render();
  }

  render() {
    // Create new group
    if (!this.node) {
      this.node = this.parent.group.group();
      this.node.addClass('node-content');
    }

    // Get NodeStyle
    const { padding, backgroundColor, textFont, backgroundRadius, backgroundStroke } = this.style;

    // Create text node
    let text: Text = this.node.findOne('.node-content-text') as Text;
    if (!text) {
      text = this.node.text(this.content);
      text.addClass('node-content-text');
    }

    // Style text node
    text.font(textFont);

    // Get text box size
    const size = text.bbox();

    // Find background node
    let background: Rect = this.node.findOne('.node-content-background') as Rect;
    const backgroundExistedBefore = !!background;

    // Create background node, insert before text node
    if (!background) {
      background = new Rect({
        x: size.x,
        y: size.y,
        width: Math.ceil(size.width + padding.x * 2),
        height: Math.ceil(size.height + padding.y * 2),
      });

      background.addClass('node-content-background');
    }

    // Style background node
    background.fill(backgroundColor);
    background.stroke(backgroundStroke);
    background.radius(backgroundRadius);

    // Insert before text node
    if (!backgroundExistedBefore) {
      this.node.add(background, 0);
    }

    // Move text node to the center of the background node
    const backgroundSize = background.bbox();
    text.center(backgroundSize.cx, backgroundSize.cy);
  }

  remove() {
    if (this.node) {
      this.node.remove();
    }
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