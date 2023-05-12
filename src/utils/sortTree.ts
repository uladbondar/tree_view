import { TreeNode } from '../types';

export const sortTree = (nodes: TreeNode[]): TreeNode[] => {
  const folders = nodes
    .filter((node) => node.children)
    .sort((a, b) => a.name.localeCompare(b.name));
  folders.forEach((node) => {
    node.children = sortTree(node.children || []);
  });
  const files = nodes
    .filter((node) => !node.children)
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...folders, ...files];
};
