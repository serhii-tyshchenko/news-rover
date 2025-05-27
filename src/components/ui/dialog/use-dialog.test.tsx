import { Mock, vi } from 'vitest';

import { act, renderHook } from '@testing-library/react';

import { useDialog } from './use-dialog';

describe('useDialog', () => {
  let mockOnClose: Mock;
  let dialog: HTMLDialogElement;

  beforeEach(() => {
    mockOnClose = vi.fn();
    dialog = document.createElement('dialog');

    dialog.showModal = vi.fn();
    dialog.close = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should open the dialog when "opened" is true', () => {
    const { result, rerender } = renderHook(
      ({ opened }) => useDialog(opened, mockOnClose),
      {
        initialProps: { opened: false },
      },
    );

    Object.defineProperty(result.current, 'current', {
      value: dialog,
      writable: false,
    });

    rerender({ opened: true });

    expect(dialog.showModal).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog when "opened" is false', () => {
    const { result, rerender } = renderHook(
      ({ opened }) => useDialog(opened, mockOnClose),
      {
        initialProps: { opened: true },
      },
    );

    Object.defineProperty(result.current, 'current', {
      value: dialog,
      writable: false,
    });

    rerender({ opened: false });

    expect(dialog.close).toHaveBeenCalledTimes(1);
  });

  it('should call "onClose" when Escape key is pressed', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    renderHook(() => useDialog(false, mockOnClose));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call "onClose" for other keys', () => {
    renderHook(() => useDialog(false, mockOnClose));

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    act(() => {
      document.dispatchEvent(event);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() => useDialog(false, mockOnClose));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
  });
});
