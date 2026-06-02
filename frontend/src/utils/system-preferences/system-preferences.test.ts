import { describe, expect, it, vi } from 'vitest';

import { ELocale } from '@types';

import { getInitialLocale, shouldReduceMotion } from './system-preferences';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('(Function) shouldReduceMotion', () => {
  it('should return true if prefers-reduced-motion is set to reduce', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    expect(shouldReduceMotion()).toBe(true);
  });

  it('should return false if prefers-reduced-motion is not set to reduce', () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: query !== '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    expect(shouldReduceMotion()).toBe(false);
  });
});

describe('(Function) getInitialLocale', () => {
  it('should return the system locale if it is a valid ELocale', () => {
    const languageSpy = vi.spyOn(navigator, 'language', 'get');

    languageSpy.mockReturnValue('en-US');
    expect(getInitialLocale()).toBe(ELocale.EnUS);

    languageSpy.mockReturnValue('uk');
    expect(getInitialLocale()).toBe(ELocale.Uk);
  });

  it('should return ELocale.EnUS if the system locale is not a valid ELocale', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR');
    expect(getInitialLocale()).toBe(ELocale.EnUS);
  });
});
