import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '../button';
import Dialog from './dialog';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {
    onClose: fn(),
    title: 'Dialog title',
    children: 'Dialog content',
    opened: false,
    closeBtnTitle: 'Close',
  },
} satisfies Meta<typeof Dialog>;

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
        <Dialog opened={isOpen} onClose={() => setIsOpen(false)}>
          Dialog content
        </Dialog>
      </>
    );
  },
  args: {},
};
