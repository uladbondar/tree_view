import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tree } from './Tree';

describe('Tree', () => {
  describe('loader element', () => {
    test('renders, when data is loading', () => {
      render(<Tree data={[]} isVirtualizationEnabled={false} isLoading />);

      const loaderElement = screen.getByTestId('tree-loader');

      expect(loaderElement).toBeInTheDocument();
    });

    test('does not render, when data is not loading', () => {
      render(
        <Tree data={[]} isVirtualizationEnabled={false} isLoading={false} />
      );

      const loaderElement = screen.queryByTestId('tree-loader');

      expect(loaderElement).toBeNull();
    });
  });

  describe('no data element', () => {
    test('renders, when there is no data', () => {
      render(
        <Tree data={[]} isVirtualizationEnabled={false} isLoading={false} />
      );

      const noDataElement = screen.getByTestId('tree-no-data');

      expect(noDataElement).toBeInTheDocument();
    });
  });

  describe('tree with files', () => {
    test('renders multiple files', () => {
      const data = [
        {
          id: '1',
          name: 'file1',
        },
        {
          id: '2',
          name: 'file2',
        },
      ];

      render(
        <Tree data={data} isVirtualizationEnabled={false} isLoading={false} />
      );

      const fileElements = screen.getAllByTestId('tree-file');

      expect(fileElements.length).toBe(2);
      expect(fileElements[0]).toHaveTextContent('file1');
      expect(fileElements[1]).toHaveTextContent('file2');
    });
  });

  describe('tree with folders', () => {
    test('renders folder', () => {
      const data = [
        {
          id: '1',
          name: 'folder1',
          children: [
            {
              id: '2',
              name: 'file1',
            },
          ],
        },
      ];

      render(
        <Tree data={data} isVirtualizationEnabled={false} isLoading={false} />
      );

      const folderElements = screen.getAllByTestId('tree-folder');

      expect(folderElements.length).toBe(1);
      expect(folderElements[0]).toHaveTextContent('folder1');
    });

    test('expands/collapses folder by clicking on icon', () => {
      const data = [
        {
          id: '1',
          name: 'folder1',
          children: [
            {
              id: '2',
              name: 'file1',
            },
          ],
        },
      ];

      render(
        <Tree data={data} isVirtualizationEnabled={false} isLoading={false} />
      );

      // Expand
      const expandIcon = screen.getByTestId('tree-folder-expand');
      fireEvent.click(expandIcon);

      let fileElement: HTMLElement | null = screen.getByTestId('tree-file');
      expect(fileElement).toBeInTheDocument();

      // Collapse
      const collapseIcon = screen.getByTestId('tree-folder-collapse');
      fireEvent.click(collapseIcon);

      fileElement = screen.queryByTestId('tree-file');
      expect(fileElement).toBeNull();
    });

    test('expands/collapses folder by double click', () => {
      const data = [
        {
          id: '1',
          name: 'folder1',
          children: [
            {
              id: '2',
              name: 'file1',
            },
          ],
        },
      ];

      render(
        <Tree data={data} isVirtualizationEnabled={false} isLoading={false} />
      );

      const folderElement = screen.getByTestId('tree-folder');

      // Expand
      fireEvent.dblClick(folderElement);

      let fileElement: HTMLElement | null = screen.getByTestId('tree-file');
      expect(fileElement).toBeInTheDocument();

      // Collapse
      fireEvent.dblClick(folderElement);

      fileElement = screen.queryByTestId('tree-file');
      expect(fileElement).toBeNull();
    });
  });

  // TODO: move to sortTree.test.js?
  describe('sorting', () => {
    test('sorts files and folders by name and places folders first', () => {
      const data = [
        {
          id: 'File_B',
          name: 'File_B',
        },
        {
          id: 'Folder_B',
          name: 'Folder_B',
          children: [],
        },
        {
          id: 'Folder_A',
          name: 'Folder_A',
          children: [],
        },
        {
          id: 'File_A',
          name: 'File_A',
        },
      ];

      render(
        <Tree data={data} isVirtualizationEnabled={false} isLoading={false} />
      );

      const treeNodes = screen.queryAllByTestId(/^tree-node-.+$/);

      expect(treeNodes.length).toBe(4);
      expect(treeNodes[0]).toHaveTextContent('Folder_A');
      expect(treeNodes[1]).toHaveTextContent('Folder_B');
      expect(treeNodes[2]).toHaveTextContent('File_A');
      expect(treeNodes[3]).toHaveTextContent('File_B');
    });
  });
});
