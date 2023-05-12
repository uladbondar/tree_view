import { Profiler, ProfilerOnRenderCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tree } from './Tree';
import { TreeNode } from '../../types';

const meta: Meta<typeof Tree> = {
  title: 'Tree',
  component: Tree,
};

export default meta;
type Story = StoryObj<typeof meta>;

const largeDataSet: TreeNode[] = new Array(1000).fill(0).map((_, index) => {
  return {
    id: `folder_${index}`,
    name: `Folder ${index}`,
    children: new Array(100).fill(0).map((_, index) => ({
      id: `file_${index}`,
      name: `File ${index}`,
    })),
  };
});

const onMeasureRenderingTime: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration
) => {
  console.log(
    `Component "${id}" took ${actualDuration}ms to render during ${phase}.`
  );
};

export const Loading: Story = {
  render: () => {
    return (
      <div style={{ width: '10rem' }}>
        <Tree data={[]} isLoading />
      </div>
    );
  },
};

export const NoData: Story = {
  render: () => {
    return <Tree data={[]} isLoading={false} />;
  },
};

export const VirtualizationDisabled: Story = {
  render: () => {
    return (
      <Profiler id="VirtualizationDisabled" onRender={onMeasureRenderingTime}>
        <Tree
          data={largeDataSet}
          isLoading={false}
          isVirtualizationEnabled={false}
        />
      </Profiler>
    );
  },
};

export const VirtualizationEnabled: Story = {
  render: () => {
    return (
      <Profiler id="VirtualizationEnabled" onRender={onMeasureRenderingTime}>
        <div style={{ height: '100vh' }}>
          <Tree
            data={largeDataSet}
            isLoading={false}
            isVirtualizationEnabled={true}
          />
        </div>
      </Profiler>
    );
  },
};
