export interface RawNode {
  content: string;
  children?: RawNode[];
}

export function isRawNodeDifferent(target: RawNode, compare: RawNode) {
  if (target.content !== compare.content) {
    return true;
  }

  if (target.children && compare.children) {
    if (target.children.length !== compare.children.length) {
      return true;
    }
    for (let i = 0; i < target.children.length; i++) {
      if (isRawNodeDifferent(target.children[i], compare.children[i])) {
        return true;
      }
    }
  } else if (target.children || compare.children) {
    return true;
  }

  return false;
}