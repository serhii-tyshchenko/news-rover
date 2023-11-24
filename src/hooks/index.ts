import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TRootState, TAppDispatch } from 'store';

export * from './useTheme';
export * from './useMediaQuery';
export { default as useLocalization } from './useLocalization';
export * from './useToggle';
export { default as useAnimation } from './useAnimation';

export const useAppDispatch: () => TAppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
