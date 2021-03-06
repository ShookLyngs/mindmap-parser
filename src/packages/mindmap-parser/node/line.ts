import { RenderNode } from './node';
import { Path } from '@svgdotjs/svg.js';
import { createCubicBezierPath } from '../utils/bezier';

export class RenderNodeLineGroup {
  parent: RenderNode;
  lines: RenderNodeLine[];

  constructor(parent: RenderNode) {
    this.parent = parent;
    if (this.parent.children) {
      this.updateLines(this.parent.children);
    }
  }

  updateLines(nodes: RenderNode[]) {
    if (this.lines) {
      this.removeLines();
    }

    this.lines = [];
    for (let i = 0; i < nodes.length; i++) {
      const line = new RenderNodeLine(this.parent, nodes[i]);
      this.lines.push(line);
    }
  }

  removeLines() {
    this.lines.forEach(line => line.remove());
    this.lines = [];
  }

  render() {
    if (this.lines.length) {
      this.lines.forEach((line) => {
        line.render();
      });
    } else if (this.parent.children) {
      this.updateLines(this.parent.children);
    }
  }
}

export class RenderNodeLine {
  parent: RenderNode;
  target: RenderNode;
  line: Path;

  get style() {
    return this.parent.style;
  }

  constructor(parent: RenderNode, target: RenderNode) {
    this.parent = parent;
    this.target = target;
    this.render();
  }

  render() {
    // Get sizes
    const parentSize = this.parent.size;
    const targetSize = this.target.size;

    // Calculate line point positions
    const x1 = parentSize.x2;
    const y1 = parentSize.y + (parentSize.height / 2);
    const x2 = targetSize.x;
    const y2 = targetSize.y + (targetSize.height / 2);

    // Get path
    const path = createCubicBezierPath(x1, y1, x2, y2);

    if (!this.line) {
      // Draw a line from parent to the target
      this.line = new Path({ d: path });
      this.line.stroke(this.style.lineStroke);
      this.line.fill('none');

      this.parent.context.root.group.add(this.line, 0);
    } else {
      // Update line
      this.line.plot(path);
    }
  }

  remove() {
    if (this.line) {
      this.line.remove();
    }
  }
}