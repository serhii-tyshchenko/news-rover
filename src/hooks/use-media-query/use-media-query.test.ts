import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import useMediaQuery from './use-media-query';

describe('useMediaQuery', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(min-width: 600px)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it('should return true if the media query matches', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('should return false if the media query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1200px)'));
    expect(result.current).toBe(false);
  });

  it('should update matches when the media query changes', () => {
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 600px)',
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }));

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      {
        initialProps: { query: '(min-width: 600px)' },
      },
    );

    expect(result.current).toBe(true);

    rerender({ query: '(min-width: 1200px)' });
    expect(result.current).toBe(false);
  });

  it('should clean up event listeners on unmount', () => {
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 600px)',
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    }));

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 600px)'));
    expect(mockAddEventListener).toHaveBeenCalled();
    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalled();
  });
});
