import React, { memo, MouseEventHandler, useContext } from 'react';
import File from '@mui/icons-material/Article';
import { Grid, Typography } from '@mui/material';
import { TreeNodeContainer } from './TreeNodeContainer';
import { TreeNodeProps } from './Tree.types';
import { TreeContext } from './Tree.context';

export const TreeNodeFile: React.FC<TreeNodeProps> = memo(
  ({ node, nestingLevel }) => {
    const treeCtx = useContext(TreeContext);

    const onDoubleClick: MouseEventHandler = () => {
      treeCtx.setSelectedNode(node);
    };

    return (
      <TreeNodeContainer id={node.id} onDoubleClick={onDoubleClick}>
        <Grid
          container
          alignItems="center"
          pl={nestingLevel * 3 + 3}
          data-testid="tree-file"
        >
          <Grid item mr={0.5}>
            <File />
          </Grid>
          <Grid item>
            <Typography variant="body1" component="span">
              {node.name}
            </Typography>
          </Grid>
        </Grid>
      </TreeNodeContainer>
    );
  }
);
