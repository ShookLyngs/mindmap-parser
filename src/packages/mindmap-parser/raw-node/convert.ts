import { RawNode } from './raw-node';

export interface StringToRawNodeOptions {
  space: number;
}

export function stringToRawNode(input: string, options: StringToRawNodeOptions): RawNode {
  // Make both ends of the string has no space
  input = input.trim();

  // Normalize newlines, make sure they are all \n and not \r\n
  // Also make sure on each line there is only one \n
  input = input.replace(/\r+/g, '\n');
  input = input.replace(/\n+/g, '\n');

  // Split the input into lines
  const rows = input.split(/\n/);

  if (rows.length) {
    // Create context list
    const nodes = createStringNodeContextList(rows, options.space);

    // Create raw node from the root
    return convertRawNode(nodes, 0);
  } else {
    return void 0;
  }
}

export function convertRawNode(rows: StringNodeContext[], index: number): RawNode {
  const target = rows[index];
  const node: RawNode = {
    content: target.content,
  };

  const children = [];
  for (let i = index + 1; i < rows.length; i++) {
    const row = rows[i];

    // If row level is less than target level,
    // it means we have reached the end of the children for target
    if (row.level <= target.level) {
      break;
    }

    // If row level is equal to target level,
    // it means we have found a child for target
    if (row.level === target.level + 1) {
      children.push(convertRawNode(rows, i));
    }
  }

  if (children.length) {
    node.children = children;
  }

  return node;
}

export interface StringNodeContext {
  content: string;
  spaces: number;
  level: number;
}
export function createStringNodeContext(target: string, space: number): StringNodeContext {
  const matched = target.match(/(?<spaces>\s*)-\s+(?<content>.+)\n?/);
  if (!matched) {
    throw new Error(`No content matched to StringNode: "${target}"`);
  }

  const { groups } = matched;
  if (!groups || !groups.content) {
    throw new Error(`Cannot convert StringNode to RawNode, syntax could be wrong: "${target}"`);
  }

  const spaces = groups.spaces?.length || 0;
  const level = Math.ceil(spaces / space);

  return {
    level,
    spaces,
    content: groups.content,
  };
}

export function createStringNodeContextList(list: string[], space: number) {
  return list.map((node) => createStringNodeContext(node, space));
}