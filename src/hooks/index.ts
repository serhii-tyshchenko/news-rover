import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TRootState, TAppDispatch } from 'store';

export * from './use-theme';
export * from './use-media-query';
export * from './use-dialog-state';
export { default as useLocalization } from './use-localization';
export * from './use-toggle';
export { default as useAnimation } from './use-animation';

export const useAppDispatch: () => TAppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
