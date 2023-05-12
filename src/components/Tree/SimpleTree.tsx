import React, { useState } from 'react';
import { TreeNodeFolder } from './TreeNodeFolder';
import { TreeNodeFile } from './TreeNodeFile';
import { TreeNodeProps, TreeRootProps } from './Tree.types';

const SimpleTreeNodeFolder: React.FC<TreeNodeProps> = ({
  node,
  nestingLevel,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <TreeNodeFolder
        node={node}
        nestingLevel={nestingLevel}
        setOpen={setOpen}
        isOpen={isOpen}
      />
      {isOpen && node.children && (
        <>
          {node.children.map((child) => {
            return child.children ? (
              <SimpleTreeNodeFolder
                key={child.id}
                node={child}
                nestingLevel={nestingLevel + 1}
              />
            ) : (
              <TreeNodeFile
                key={child.id}
                node={child}
                nestingLevel={nestingLevel + 1}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export const SimpleTree: React.FC<TreeRootProps> = ({ data }) => {
  return (
    <div data-testid="tree" role="list">
      {data.map((node) => {
        return node.children ? (
          <SimpleTreeNodeFolder key={node.id} node={node} nestingLevel={0} />
        ) : (
          <TreeNodeFile key={node.id} node={node} nestingLevel={0} />
        );
      })}
    </div>
  );
};
