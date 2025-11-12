import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from '@hooks';

import useBreakpoints from './use-breakpoints';

// Mock useMediaQuery from @hooks
vi.mock('@hooks', () => ({
  useMediaQuery: vi.fn(),
}));

describe('(Hook) useBreakpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns sm breakpoint when only isSm is true', () => {
    (useMediaQuery as Mock)
      .mockReturnValueOnce(true) // isSm
      .mockReturnValueOnce(false) // isMd
      .mockReturnValueOnce(false) // isLg
      .mockReturnValueOnce(false) // isXl
      .mockReturnValueOnce(false); // is2xl

    const result = useBreakpoints();
    expect(result).toEqual({
      isSm: true,
      isMd: false,
      isLg: false,
      isXl: false,
      is2xl: false,
      breakpoint: 'sm',
    });
  });

  it('returns md breakpoint when isMd is true', () => {
    (useMediaQuery as Mock)
      .mockReturnValueOnce(true) // isSm
      .mockReturnValueOnce(true) // isMd
      .mockReturnValueOnce(false) // isLg
      .mockReturnValueOnce(false) // isXl
      .mockReturnValueOnce(false); // is2xl

    const result = useBreakpoints();
    expect(result.breakpoint).toBe('md');
    expect(result.isMd).toBe(true);
  });

  it('returns lg breakpoint when isLg is true', () => {
    (useMediaQuery as Mock)
      .mockReturnValueOnce(true) // isSm
      .mockReturnValueOnce(true) // isMd
      .mockReturnValueOnce(true) // isLg
      .mockReturnValueOnce(false) // isXl
      .mockReturnValueOnce(false); // is2xl

    const result = useBreakpoints();
    expect(result.breakpoint).toBe('lg');
    expect(result.isLg).toBe(true);
  });

  it('returns xl breakpoint when isXl is true', () => {
    (useMediaQuery as Mock)
      .mockReturnValueOnce(true) // isSm
      .mockReturnValueOnce(true) // isMd
      .mockReturnValueOnce(true) // isLg
      .mockReturnValueOnce(true) // isXl
      .mockReturnValueOnce(false); // is2xl

    const result = useBreakpoints();
    expect(result.breakpoint).toBe('xl');
    expect(result.isXl).toBe(true);
  });

  it('returns 2xl breakpoint when is2xl is true', () => {
    (useMediaQuery as Mock)
      .mockReturnValueOnce(true) // isSm
      .mockReturnValueOnce(true) // isMd
      .mockReturnValueOnce(true) // isLg
      .mockReturnValueOnce(true) // isXl
      .mockReturnValueOnce(true); // is2xl

    const result = useBreakpoints();
    expect(result.breakpoint).toBe('2xl');
    expect(result.is2xl).toBe(true);
  });
});
