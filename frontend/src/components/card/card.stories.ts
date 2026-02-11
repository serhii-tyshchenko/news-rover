import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Card from './card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    title: 'Very long card title',
    children: 'Card content',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithControls: Story = {
  args: {
    controlsConfig: [
      { title: 'Bookmark', onClick: fn(), icon: 'bookmark' },
      { title: 'Refresh', onClick: fn(), icon: 'arrows-cw' },
    ],
  },
};
