import React, { memo, useMemo } from 'react';
import { Typography, Skeleton, Stack, Box } from '@mui/material';
import { TreeNode } from '../../types';
import { sortTree } from '../../utils';
import { VirtualizedTree } from './VirtualizedTree';
import { SimpleTree } from './SimpleTree';
import { TreeContextProvider } from './Tree.context';

type TreeProps = {
  data: TreeNode[];
  isLoading?: boolean;
  isVirtualizationEnabled?: boolean;
  onSelectNode?: (node: TreeNode) => void;
};

export const Tree: React.FC<TreeProps> = memo(
  ({
    data = [],
    isLoading = false,
    isVirtualizationEnabled = true,
    onSelectNode = () => {},
  }) => {
    const sortedData = useMemo(() => {
      // TODO: maybe sort on expand of folder? Let's measure performance in both cases
      return data ? sortTree(data) : [];
    }, [data]);

    if (isLoading) {
      return (
        <Stack data-testid="tree-loader" aria-busy>
          <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
        </Stack>
      );
    }

    if (!sortedData.length) {
      return (
        <Box data-testid="tree-no-data">
          <Typography variant="h6" color="text.secondary">
            No items found.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please try again later.
          </Typography>
        </Box>
      );
    }

    return (
      <TreeContextProvider onSelectNode={onSelectNode}>
        {isVirtualizationEnabled ? (
          <VirtualizedTree data={sortedData} />
        ) : (
          <SimpleTree data={sortedData} />
        )}
      </TreeContextProvider>
    );
  }
);
