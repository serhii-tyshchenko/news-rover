import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Select } from './select';
import { EControlSize } from '@types';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onChange: fn(),
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Select option',
  },
};

export const WithError: Story = {
  args: {
    label: 'Select option',
    error: 'Error message',
  },
};

export const Big: Story = {
  args: {
    size: EControlSize.Big,
  },
};
