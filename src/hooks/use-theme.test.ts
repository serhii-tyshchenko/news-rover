import { vi } from 'vitest';

import * as hooks from '@hooks';
import * as selectors from '@store/selectors';
import { renderHook } from '@testing-library/react';
import { ETheme } from '@types';

import { useTheme } from './use-theme';

vi.mock('@hooks', () => ({
  useAppSelector: vi.fn(),
  useMediaQuery: vi.fn(),
}));

vi.mock('@store/selectors', () => ({
  selectTheme: vi.fn(),
}));

describe('useTheme', () => {
  const setAttributeMock = vi.fn();

  beforeAll(() => {
    Object.defineProperty(document, 'documentElement', {
      value: { setAttribute: setAttributeMock },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should set theme to dark when system theme is dark and ETheme.System is selected', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValue(ETheme.System);
    vi.spyOn(hooks, 'useMediaQuery').mockReturnValue(true); // prefers dark mode

    renderHook(() => useTheme());

    expect(setAttributeMock).toHaveBeenCalledWith('data-theme', ETheme.Dark);
  });

  it('should set theme to light when system theme is light and ETheme.System is selected', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValue(ETheme.System);
    vi.spyOn(hooks, 'useMediaQuery').mockReturnValue(false); // prefers light mode

    renderHook(() => useTheme());

    expect(setAttributeMock).toHaveBeenCalledWith('data-theme', ETheme.Light);
  });

  it('should set theme to dark when ETheme.Dark is selected', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValue(ETheme.Dark);

    renderHook(() => useTheme());

    expect(setAttributeMock).toHaveBeenCalledWith('data-theme', ETheme.Dark);
  });

  it('should set theme to light when ETheme.Light is selected', () => {
    vi.spyOn(hooks, 'useAppSelector').mockReturnValue(ETheme.Light);

    renderHook(() => useTheme());

    expect(setAttributeMock).toHaveBeenCalledWith('data-theme', ETheme.Light);
  });
});
