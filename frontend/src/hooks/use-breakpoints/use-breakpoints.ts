import { useMediaQuery } from '@hooks';
import { TBreakpoint } from '@types';

function useBreakpoints() {
  const isSm = useMediaQuery('(min-width: 640px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isXl = useMediaQuery('(min-width: 1280px)');
  const is2xl = useMediaQuery('(min-width: 1536px)');
  const breakpoint: TBreakpoint = is2xl
    ? '2xl'
    : isXl
      ? 'xl'
      : isLg
        ? 'lg'
        : isMd
          ? 'md'
          : 'sm';

  return { isSm, isMd, isLg, isXl, is2xl, breakpoint };
}

export default useBreakpoints;
