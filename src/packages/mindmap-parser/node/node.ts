import { G, Svg } from '@svgdotjs/svg.js';
import { createRenderNodeContext, RenderNodeContext } from './context';
import { isRawNodeDifferent, RawNode } from './raw-node';
import { RenderContentNode } from './content-node';
import { RenderNodeLineGroup } from './line';
import { NodeTheme } from './node-style';

export interface CreateRenderNodeParams {
  raw: RawNode;
  index?: number;
  column?: number;
  theme?: NodeTheme;
  parent: Svg | RenderNode;
  context?: RenderNodeContext;
}

export interface RenderChildrenNodeSize {
  y: number;
  width: number;
  height: number;
  maxHeight: number;
}

export class RenderNode {
  content: string;
  column?: number;
  index?: number;
  raw: RawNode;
  node: RenderContentNode;
  context: RenderNodeContext;
  group: G;
  childrenGroup: G;
  parent?: RenderNode;
  children: RenderNode[];
  childrenSize: RenderChildrenNodeSize;
  lineGroup: RenderNodeLineGroup;

  get isRoot() {
    return this.parent === void 0 || this.parent === null;
  }
  get size() {
    return this.node.size;
  }
  get style() {
    if (this.context.theme.columns[this.column]) {
      return this.context.theme.columns[this.column];
    } else {
      return this.context.theme.normal;
    }
  }

  constructor({ raw, column, index, context, parent, theme }: CreateRenderNodeParams) {
    this.raw = raw;
    this.index = index;
    this.column = column ?? 0;
    this.content = raw.content;

    if (parent instanceof Svg) {
      this.context = createRenderNodeContext({
        canvas: parent,
        root: this,
        theme,
      });
    } else {
      this.parent = parent;
      this.context = context;
    }

    this.render();
  }

  /**
   * Node
   */

  renderNode() {
    if (this.group) this.group.remove();

    if (this.isRoot) {
      this.group = this.context.canvas.group();
      this.group.addClass('node-root');
    } else {
      this.group = this.parent!.childrenGroup.group();
      this.group.addClass('node-group');
    }

    if (this.node) this.node.remove();
    this.node = new RenderContentNode(this);
  }

  updateNodePosition() {
    if (this.parent && this.parent.children && this.index > 0) {
      const { margin } = this.style;

      const childrenHeight = this.children ? this.childrenSize.maxHeight : 0;

      const previous = this.parent.children[this.index - 1];
      const previousSize = previous.size;
      const previousGroupSize = previous.group.bbox();

      if (previous.children) {
        this.node.y(previousGroupSize.y2 + margin.y + (childrenHeight / 2));
      } else {
        this.node.y(previousSize.y + previousSize.height + (childrenHeight / 2 - (previousSize.height / 2)) + margin.y);
      }
    } else if (!this.parent || this.index === 0) {
      if (this.children.length) {
        const size = this.size;
        const childrenSize = this.childrenSize;
        const firstChildSize = this.children[0].size;

        this.node.y(firstChildSize.y + (size.height / 2) + (childrenSize.height / 2));
      }
    }
  }

  /**
   * Children
   */

  renderChildrenGroup(children?: RawNode[]) {
    this.removeChildren();
    this.childrenSize = {
      maxHeight: 0,
      height: 0,
      width: 0,
      y: 0,
    };

    if (Array.isArray(children) && children.length) {
      // Generate children group
      if (!this.childrenGroup) {
        this.childrenGroup = this.group.group();
        this.childrenGroup.addClass('node-children-group');
      } else {
        this.childrenGroup.clear();
      }

      // Generate children nodes
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childNode = new RenderNode({
          index: i,
          raw: child,
          parent: this,
          context: this.context,
          column: this.column + 1,
        });

        // Update children size
        this.childrenSize.height = i > 0 ? childNode.size.y2 - this.children[0].size.y : childNode.size.height;

        // Update children max height
        this.childrenSize.maxHeight = Math.max(childNode.childrenSize.maxHeight, this.childrenSize.height);
        if (childNode.size.width > this.childrenSize.width) {
          this.childrenSize.width = childNode.size.width;
        }

        // Add child node to children list
        this.children.push(childNode);
      }

      // Update children group size
      this.childrenSize.y = this.childrenGroup.bbox().y;
    } else {
      this.removeChildren();
    }
  }

  updateChildrenGroupPosition() {
    if (!this.childrenGroup) return;

    const { margin } = this.style;
    const { x, y, width, height } = this.size;
    const childrenSize = this.childrenSize;
    const firstChildSize = this.children[0].size;
    const childrenGroupSize = this.childrenGroup.bbox();

    const firstChildYDiff = firstChildSize.y - childrenGroupSize.y;

    this.childrenGroup.x(x + width + margin.x);
    this.childrenGroup.y(y + height / 2 - firstChildYDiff - (childrenSize.height / 2));
  }

  removeChildren() {
    if (this.childrenGroup) {
      this.childrenGroup.clear();
    }

    this.children = [];
  }

  /**
   * Line
   */

  renderLineGroup() {
    // Create or update line group
    if (!this.lineGroup) {
      this.lineGroup = new RenderNodeLineGroup(this);
    } else {
      this.lineGroup.render();
    }

    // update children line groups
    if (this.children) {
      this.children.forEach((child) => {
        child.renderLineGroup();
      });
    }
  }

  removeLines() {
    this.lineGroup.removeLines();
  }
  removeChildrenLines() {
    if (this.children) {
      this.children.forEach((child) => {
        child.removeLines();
        child.removeChildrenLines();
      });
    }
  }

  /**
   * Render
   */

  render() {
    // Render Node and its children nodes
    this.renderNode();
    this.renderChildrenGroup(this.raw.children);

    // Update positions
    this.updateNodePosition();
    this.updateChildrenGroupPosition();

    // Render line
    this.renderLineGroup();
  }

  update(raw: RawNode) {
    if (this.raw.content !== this.content) {
      this.raw = raw;
      this.content = raw.content;

      this.render();
    } else if (isRawNodeDifferent(this.raw, raw)) {
      this.raw.children = raw.children;

      // Remove lines, and then render children nodes
      this.removeChildrenLines();
      this.renderChildrenGroup(raw.children);

      // Update positions
      this.updateChildrenGroupPosition();

      // Render line
      this.renderLineGroup();
    }
  }
}