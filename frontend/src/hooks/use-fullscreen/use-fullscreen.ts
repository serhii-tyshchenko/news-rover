import { useCallback, useSyncExternalStore } from 'react';
import { useAppSelector } from '@store/hooks';
import { selectSettingsData } from '@store/slices';

function subscribe(callback: () => void) {
  document.addEventListener('fullscreenchange', callback);
  return () => document.removeEventListener('fullscreenchange', callback);
}

function getSnapshot() {
  return !!document.fullscreenElement;
}

function useFullscreen() {
  const isFullscreen = useSyncExternalStore(subscribe, getSnapshot);

  const { fullscreenToggle } = useAppSelector(selectSettingsData);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, [isFullscreen]);

  return {
    isFullscreenEnabled: fullscreenToggle && document.fullscreenEnabled,
    isFullscreen,
    toggleFullscreen,
  };
}

export default useFullscreen;
