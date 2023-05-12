import React, { useCallback } from 'react';
import {
  FixedSizeTree,
  FixedSizeNodeData,
  FixedSizeNodePublicState,
  TreeWalkerValue,
} from 'react-vtree';
import AutoSizer from 'react-virtualized-auto-sizer';

import { TreeNode } from '../../types';
import { TreeNodeFolder } from './TreeNodeFolder';
import { TreeNodeFile } from './TreeNodeFile';
import { TreeNodeProps, TreeRootProps } from './Tree.types';

type VirtualizedTreeNodeData = FixedSizeNodeData & {
  isLeaf: boolean;
  name: string;
  nestingLevel: number;
};

type VirtualizedTreeNodeProps =
  FixedSizeNodePublicState<VirtualizedTreeNodeData>;

const getNodeData = (
  node: TreeNode,
  nestingLevel: number
): TreeWalkerValue<VirtualizedTreeNodeData, TreeNodeProps> => {
  return {
    data: {
      id: node.id,
      name: node.name,
      isLeaf: !node.children,
      isOpenByDefault: false,
      nestingLevel,
      ...(node.content && { content: node.content }),
    },
    nestingLevel,
    node,
  };
};
const VirtualizedTreeNode: React.FC<VirtualizedTreeNodeProps> = ({
  data: { isLeaf, nestingLevel, ...node },
  isOpen,
  setOpen,
  // @ts-ignore
  style,
}) => {
  if (isLeaf) {
    return (
      <div style={style}>
        <TreeNodeFile node={node} nestingLevel={nestingLevel} />
      </div>
    );
  }

  return (
    <div style={style}>
      <TreeNodeFolder
        node={node}
        nestingLevel={nestingLevel}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </div>
  );
};

export const VirtualizedTree: React.FC<TreeRootProps> = ({ data }) => {
  const treeWalker = useCallback(
    function* () {
      for (let i = 0; i < data.length; i++) {
        yield getNodeData(data[i], 0);
      }

      while (true) {
        const parent: TreeWalkerValue<VirtualizedTreeNodeData, TreeNodeProps> =
          yield;

        const children = parent.node.children || [];
        for (let i = 0; i < children.length; i++) {
          yield getNodeData(children[i], parent.nestingLevel + 1);
        }
      }
    },
    [data]
  );

  return (
    <AutoSizer disableWidth>
      {({ height }) => (
        <FixedSizeTree
          treeWalker={treeWalker}
          itemSize={24}
          height={height}
          width="100%"
        >
          {VirtualizedTreeNode}
        </FixedSizeTree>
      )}
    </AutoSizer>
  );
};
