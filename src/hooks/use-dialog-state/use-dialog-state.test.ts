import { describe, expect, it } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useDialogState } from './use-dialog-state';

describe('useDialogState', () => {
  it('should initialize with the default state as false', () => {
    const { result } = renderHook(() => useDialogState());
    expect(result.current.opened).toBe(false);
  });

  it('should initialize with the provided initial state', () => {
    const { result } = renderHook(() => useDialogState(true));
    expect(result.current.opened).toBe(true);
  });

  it('should open the dialog when openDialog is called', () => {
    const { result } = renderHook(() => useDialogState());
    act(() => {
      result.current.openDialog();
    });
    expect(result.current.opened).toBe(true);
  });

  it('should close the dialog when closeDialog is called', () => {
    const { result } = renderHook(() => useDialogState(true));
    act(() => {
      result.current.closeDialog();
    });
    expect(result.current.opened).toBe(false);
  });
});
