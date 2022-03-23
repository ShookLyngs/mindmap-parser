import { Box, G, Svg } from '@svgdotjs/svg.js';
import { createRenderNodeContext, RenderNodeContext } from './context';
import { isRawNodeDifferent, RawNode } from '../raw-node/raw-node';
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
    if (!this.group) {
      if (this.isRoot) {
        this.group = this.context.canvas.group();
        this.group.addClass('node-root');
      } else {
        this.group = this.parent!.childrenGroup.group();
        this.group.addClass('node-group');
      }
    }

    if (!this.node) {
      this.node = new RenderContentNode(this);
    } else {
      this.node.render();
    }
  }

  updateNodePosition() {
    const { height } = this.size;
    const { margin } = this.style;
    const previousAncestor = this.findAncestorPreviousNode();
    const previousAncestorY2 = previousAncestor ? previousAncestor.group.bbox().y2 : 0;

    if (this.children.length) {
      const firstChildSize = this.children[0].size;
      const childrenHeight = this.childrenSize.maxHeight;
      const childrenYDiff = firstChildSize.y - this.childrenGroup.bbox().y;

      if (previousAncestor) {
        this.node.y(previousAncestorY2 + margin.y + childrenYDiff + (childrenHeight / 2));
      } else {
        this.node.y(firstChildSize.y + childrenYDiff + (childrenHeight / 2));
      }
    } else {
      if (previousAncestor) {
        this.node.y(previousAncestorY2 + margin.y + (height / 2));
      } else if (this.parent) {
        this.node.y(this.parent.size.y);
      } else {
        this.node.y(0);
      }
    }
  }

  findAncestorPreviousNode() {
    if (this.index > 0) {
      return this.parent.children[this.index - 1];
    } else if (this.parent) {
      return this.parent.findAncestorPreviousNode();
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
    if (!this.childrenGroup || !this.children?.length) {
      return;
    }

    const { margin } = this.style;
    const { x, y, width, height } = this.size;
    const firstChildSize = this.children[0].size;
    const childrenHeight = this.childrenSize.height;
    const childrenGroupSize = this.childrenGroup.bbox();
    const firstChildYDiff = firstChildSize.y - childrenGroupSize.y;

    this.childrenGroup.x(x + width + margin.x);
    this.childrenGroup.y(y + height / 2 - firstChildYDiff - (childrenHeight / 2));
  }

  removeChildren() {
    if (this.childrenGroup) {
      this.childrenGroup.clear();
    }

    this.children = [];
  }

  updateChildrenSize() {
    this.childrenSize = {
      maxHeight: 0,
      height: 0,
      width: 0,
      y: 0,
    };

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      // Update children size
      this.childrenSize.height = i > 0 ? child.size.y2 - this.children[0].size.y : child.size.height;

      // Update children max height
      this.childrenSize.maxHeight = Math.max(child.childrenSize.maxHeight, this.childrenSize.height);
      if (child.size.width > this.childrenSize.width) {
        this.childrenSize.width = child.size.width;
      }
    }

    // Update children group size
    this.childrenSize.y = this.childrenGroup.bbox().y;
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
    if (this.children.length) {
      this.children.forEach((child) => {
        child.renderLineGroup();
      });
    }
  }

  removeLines() {
    if (this.children.length) {
      if (this.lineGroup) {
        this.lineGroup.removeLines();
      }
      this.children.forEach((child) => {
        child.removeLines();
      });
    }
  }

  /**
   * Render
   */

  render() {
    // Remove lines
    if (this.children) {
      this.removeLines();
    }

    // Render Node and its children nodes
    this.renderNode();
    this.renderChildrenGroup(this.raw.children);

    // Update positions
    this.updateNodePosition();
    this.updateChildrenGroupPosition();

    // Render line
    this.renderLineGroup();
  }

  update(raw: RawNode, force: boolean = false) {
    const contentChanged = this.content !== raw.content;
    const childrenChanged = (this.children?.length ?? 0) !== (raw.children?.length ?? 0);

    if (force || contentChanged || childrenChanged) {
      this.raw = raw;
      this.content = raw.content;

      this.render();
      return true;
    } else {
      if (!this.children?.length) {
        return false;
      }

      let updated = false;
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].update(raw.children[i], updated)) {
          updated = true;
        }
      }

      if (updated) {
        // Update children size
        this.updateChildrenSize();

        // Update positions
        this.updateNodePosition();
        this.updateChildrenGroupPosition();

        // Render line
        this.renderLineGroup();
      }

      return updated;
    }
  }

  destroy() {
    this.removeLines();
    this.removeChildren();
    this.group.remove();
  }
}