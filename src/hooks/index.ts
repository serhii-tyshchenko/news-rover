import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { TAppDispatch, TRootState } from 'store';

export * from './use-breakpoints';
export * from './use-theme';
export * from './use-media-query';
export * from './use-dialog-state';
export * from './use-draggable-list';
export { default as useLocalization } from './use-localization';
export { default as useAnimation } from './use-animation';

export const useAppDispatch: () => TAppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
