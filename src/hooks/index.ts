import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TRootState, TAppDispatch } from 'store';

export * from './useTheme';
export { default as useLocalization } from './useLocalization';
export { default as useToggle } from './useToggle';

export const useAppDispatch: () => TAppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
