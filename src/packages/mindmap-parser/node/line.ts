import { RenderNode } from './node';
import { Path } from '@svgdotjs/svg.js';

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
  }

  render() {
    this.lines.forEach((line) => {
      line.render();
    });
  }
}

export class RenderNodeLine {
  parent: RenderNode;
  target: RenderNode;
  line: Path;

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

    if (this.parent.content === 'Child 1') {
      console.log(parentSize, targetSize);
    }

    // Get path
    const path = createCubicBezierPath(x1, y1, x2, y2);

    if (!this.line) {
      // Draw a line from parent to the target
      this.line = this.parent.context.root.group.path(path);
      this.line.stroke({ width: 2, color: '#333' });
      this.line.fill('none');
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

// Create Bezier path
function createCubicBezierPath(x1, y1, x2, y2) {
  const cx1 = x1 + (x2 - x1) / 2;
  return `M ${x1},${y1} C ${cx1},${y1} ${cx1},${y2} ${x2},${y2}`;
}