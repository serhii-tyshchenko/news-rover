import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { IconButton } from './icon-button';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'cog',
  },
};
