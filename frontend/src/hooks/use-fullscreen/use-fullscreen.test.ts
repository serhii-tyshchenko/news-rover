import { vi } from 'vitest';

import * as storeHooks from '@store/hooks';
import { act, renderHook } from '@testing-library/react';

import useFullscreen from './use-fullscreen';

vi.mock('@store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('@store/slices', () => ({
  selectSettingsData: vi.fn(),
}));

describe('(Hook) useFullscreen', () => {
  const requestFullscreenMock = vi.fn();
  const exitFullscreenMock = vi.fn();

  beforeEach(() => {
    Object.defineProperty(document, 'fullscreenEnabled', {
      value: true,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      value: requestFullscreenMock,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(document, 'exitFullscreen', {
      value: exitFullscreenMock,
      writable: true,
      configurable: true,
    });

    vi.spyOn(storeHooks, 'useAppSelector').mockReturnValue({
      fullscreenToggle: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return isFullscreen as false when no fullscreen element is active', () => {
    const { result } = renderHook(() => useFullscreen());

    expect(result.current.isFullscreen).toBe(false);
  });

  it('should return isFullscreen as true when a fullscreen element is active', () => {
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFullscreen());

    expect(result.current.isFullscreen).toBe(true);
  });

  it('should return isFullscreenEnabled as true when fullscreenToggle and document.fullscreenEnabled are both true', () => {
    const { result } = renderHook(() => useFullscreen());

    expect(result.current.isFullscreenEnabled).toBe(true);
  });

  it('should return isFullscreenEnabled as false when fullscreenToggle is false', () => {
    vi.spyOn(storeHooks, 'useAppSelector').mockReturnValue({
      fullscreenToggle: false,
    });

    const { result } = renderHook(() => useFullscreen());

    expect(result.current.isFullscreenEnabled).toBe(false);
  });

  it('should return isFullscreenEnabled as false when document.fullscreenEnabled is false', () => {
    Object.defineProperty(document, 'fullscreenEnabled', {
      value: false,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFullscreen());

    expect(result.current.isFullscreenEnabled).toBe(false);
  });

  it('should call requestFullscreen when toggleFullscreen is called and not in fullscreen', () => {
    const { result } = renderHook(() => useFullscreen());

    act(() => {
      result.current.toggleFullscreen();
    });

    expect(requestFullscreenMock).toHaveBeenCalledTimes(1);
    expect(exitFullscreenMock).not.toHaveBeenCalled();
  });

  it('should call exitFullscreen when toggleFullscreen is called and already in fullscreen', () => {
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      writable: true,
      configurable: true,
    });

    const { result } = renderHook(() => useFullscreen());

    act(() => {
      result.current.toggleFullscreen();
    });

    expect(exitFullscreenMock).toHaveBeenCalledTimes(1);
    expect(requestFullscreenMock).not.toHaveBeenCalled();
  });

  it('should update isFullscreen when the fullscreenchange event fires', () => {
    const { result } = renderHook(() => useFullscreen());

    expect(result.current.isFullscreen).toBe(false);

    act(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: document.documentElement,
        writable: true,
        configurable: true,
      });
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(result.current.isFullscreen).toBe(true);

    act(() => {
      Object.defineProperty(document, 'fullscreenElement', {
        value: null,
        writable: true,
        configurable: true,
      });
      document.dispatchEvent(new Event('fullscreenchange'));
    });

    expect(result.current.isFullscreen).toBe(false);
  });

  it('should remove the fullscreenchange listener on unmount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useFullscreen());

    expect(addSpy).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));
  });
});
