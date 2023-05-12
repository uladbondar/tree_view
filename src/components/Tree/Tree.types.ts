import { TreeNode } from '../../types';

export type TreeRootProps = {
  data: TreeNode[];
};

export type TreeNodeProps = {
  node: TreeNode;
  nestingLevel: number;
};
