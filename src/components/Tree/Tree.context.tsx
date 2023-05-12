import React, { PropsWithChildren } from 'react';
import { TreeNode } from '../../types';

type TreeContextProviderProps = PropsWithChildren & {
  onSelectNode: (node: TreeNode) => void;
};

export const TreeContext = React.createContext({
  setSelectedNode: (node: TreeNode) => {},
});

export const TreeContextProvider: React.FC<TreeContextProviderProps> = ({
  children,
  onSelectNode,
}) => {
  return (
    <TreeContext.Provider value={{ setSelectedNode: onSelectNode }}>
      {children}
    </TreeContext.Provider>
  );
};
