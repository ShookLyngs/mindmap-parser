import { G, Text, Svg, Box } from '@svgdotjs/svg.js';
import { normalNodeStyle } from '@/packages/mindmap-parser/node/node-style';

export interface RawNode {
  content: string;
  children?: RawNode[];
}

export interface CreateRenderNodeParams {
  raw: RawNode;
  index?: number;
  column?: number;
  parent: Svg | RenderNode;
  context?: RenderNodeContext;
}

export interface RenderNodeSize {
  width: number;
  height: number;
}
export interface RenderChildrenNodeSize {
  width: number;
  height: number;
  maxHeight: number;
}

export class RenderNode {
  isRoot: boolean;
  content: string;
  raw: RawNode;
  node: Text;
  index?: number;
  group: G;
  childrenGroup: G;
  parent?: RenderNode;
  children: RenderNode[];
  context: RenderNodeContext;
  layerContext: RenderNodeLayerContext;
  size: RenderNodeSize;
  childrenSize: RenderChildrenNodeSize;

  constructor({ raw, column, index, context, parent }: CreateRenderNodeParams) {
    this.raw = raw;
    this.index = index;
    this.content = raw.content;

    if (parent instanceof Svg) {
      this.isRoot = true;
      this.parent = null;
      this.context = createRenderNodeContext({
        canvas: parent,
      });
    } else {
      this.isRoot = false;
      this.parent = parent;
      this.context = context;
    }

    this.layerContext = this.context.setColumnContext(column ?? 0, this.group);

    this.updateNode();
    this.updateChildrenGroup(raw.children);

    this.updateNodePosition();
    this.updateChildrenGroupPosition();
  }

  updateNode() {
    if (this.isRoot) {
      this.group = createRootGroup(this.context.canvas);
    } else {
      this.group = this.parent.childrenGroup.group();
      this.group.addClass('node-group');
    }

    this.node = this.group.text(this.content);
    this.node.addClass('node');
    this.updateNodeSize();
  }

  updateChildrenGroup(children?: RawNode[]) {
    this.children = [];
    this.childrenSize = {
      maxHeight: 0,
      height: 0,
      width: 0,
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
          column: this.layerContext.column + 1,
        });

        // Update children size
        this.childrenSize.height += childNode.size.height;
        this.childrenSize.maxHeight = Math.max(childNode.childrenSize.maxHeight, this.childrenSize.height);
        if (childNode.size.width > this.childrenSize.width) {
          this.childrenSize.width = childNode.size.width;
        }

        this.children.push(childNode);
      }

      if (this.children.length) {
        const { margin } = normalNodeStyle;
        this.childrenSize.height += margin.y * (this.children.length - 1);
      }
    } else {
      if (this.childrenGroup) {
        this.childrenGroup.clear();
      }
    }
  }

  updateNodeSize() {
    const { width, height } = this.node.bbox();
    const { padding } = normalNodeStyle;
    this.size = {
      width: width + padding.x,
      height: height,
    };
  }

  updateChildrenSize() {

  }

  updateNodePosition() {
    if (this.parent && this.parent.children && this.index > 0) {
      const { margin } = normalNodeStyle;

      const previous = this.parent.children[this.index - 1];
      this.node.dy(previous.size.height + margin.y);
    }
  }

  updateChildrenGroupPosition() {
    if (!this.childrenGroup) return;
    const { margin } = normalNodeStyle;
    const { x, y } = this.node.bbox();
    console.log(this.content, x, y);
    const { width, height } = this.size;
    const { height: childrenHeight } = this.childrenSize;
    this.childrenGroup.move(x + width + margin.x, y + (height / 2) - (childrenHeight / 2));
  }
}

function createRootGroup(parent: Svg) {
  return parent.group().addClass('node-root');
}

export interface CreateRenderNodeContextParams {
  canvas: Svg;
}
export interface RenderNodeContext extends CreateRenderNodeContextParams {
  columns: Record<number, RenderNodeLayerContext>;
  setColumnContext: (column: number, group: G) => RenderNodeLayerContext;
}
export interface RenderNodeLayerContext {
  column: number;
  group: G;
}
export function createRenderNodeContext(params: CreateRenderNodeContextParams): RenderNodeContext {
  const columns: Record<number, RenderNodeLayerContext> = {};
  function setColumnContext(column: number, group: G) {
    if (!columns[column]) {
      columns[column] = {
        column,
        group,
      };
    }

    return columns[column];
  }

  return {
    ...params,
    columns,
    setColumnContext,
  };
}