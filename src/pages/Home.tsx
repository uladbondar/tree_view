import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Tree } from '../components';
import { TreeNode } from '../types';

const DRAWER_WIDTH = 400;

export const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<TreeNode | null>(null);

  const { data, isLoading, error } = useQuery(
    'tree',
    async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tree`);
      return response.json();
    },
    { staleTime: Infinity }
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // TODO: fix having different state of tree in mobile and desktop by keeping state in parent and passing it down to Tree components

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {selectedFile && (
            <Typography variant="h6" noWrap component="div">
              {selectedFile.name}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="user directory"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          <Box sx={{ p: 1, height: '100%' }}>
            <Tree
              data={data}
              isLoading={isLoading}
              onSelectNode={setSelectedFile}
            />
          </Box>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <Box sx={{ p: 1, height: '100%' }}>
            <Tree
              data={data}
              isLoading={isLoading}
              onSelectNode={setSelectedFile}
            />
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <>
          <Toolbar />

          {error && (
            <Stack>
              <Typography variant="h6" color="text.secondary">
                Error when fetching data.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {JSON.stringify(error)}
              </Typography>
            </Stack>
          )}

          {data && !selectedFile && (
            <Typography paragraph>
              Select a file from the left to view its content.
            </Typography>
          )}

          {data && selectedFile && (
            <Typography paragraph>{selectedFile.content}</Typography>
          )}
        </>
      </Box>
    </Box>
  );
};
