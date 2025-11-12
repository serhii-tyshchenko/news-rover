import { describe, expect, it, vi } from 'vitest';

import { ELanguage } from '@types';

import { getSystemLocale, shouldReduceMotion } from './system-preferences';

describe('(Function) shouldReduceMotion', () => {
  it('should return true if prefers-reduced-motion is set to reduce', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
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
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
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

describe('(Function) getSystemLocale', () => {
  it('should return the system locale if it is a valid ELanguage', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US');
    expect(getSystemLocale()).toBe(ELanguage.En);

    vi.spyOn(navigator, 'language', 'get').mockReturnValue('uk-UA');
    expect(getSystemLocale()).toBe(ELanguage.Uk);
  });

  it('should return ELanguage.En if the system locale is not a valid ELanguage', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR');
    expect(getSystemLocale()).toBe(ELanguage.En);
  });
});
