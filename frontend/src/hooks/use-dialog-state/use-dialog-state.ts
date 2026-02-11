import { useState } from 'react';

export const useDialogState = (initialState = false) => {
  const [opened, setOpened] = useState(initialState);

  const closeDialog = () => setOpened(false);
  const openDialog = () => setOpened(true);

  return { opened, openDialog, closeDialog };
};
