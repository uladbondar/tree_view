import React, { memo } from 'react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Folder from '@mui/icons-material/Folder';
import FolderOpen from '@mui/icons-material/FolderOpen';
import { Grid, Typography } from '@mui/material';
import { TreeNodeContainer } from './TreeNodeContainer';
import { TreeNodeProps } from './Tree.types';

type TreeNodeFolderProps = TreeNodeProps & {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
};

export const TreeNodeFolder: React.FC<TreeNodeFolderProps> = memo(
  ({ node, isOpen, setOpen, nestingLevel }) => {
    const toggleOpen = () => {
      setOpen(!isOpen);
    };

    return (
      <TreeNodeContainer id={node.id} onDoubleClick={toggleOpen}>
        <Grid
          container
          alignItems="center"
          pl={nestingLevel * 3}
          data-testid="tree-folder"
        >
          <Grid item>
            {isOpen ? (
              <KeyboardArrowDown
                onClick={toggleOpen}
                data-testid="tree-folder-collapse"
              />
            ) : (
              <KeyboardArrowRight
                onClick={toggleOpen}
                data-testid="tree-folder-expand"
              />
            )}
          </Grid>
          <Grid item mr={0.5}>
            {isOpen ? <FolderOpen /> : <Folder />}
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
