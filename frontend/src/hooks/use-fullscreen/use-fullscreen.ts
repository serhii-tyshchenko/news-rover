import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { selectSettingsData } from '@store/slices';

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(
    !!document.fullscreenElement,
  );

  const { fullscreenToggle } = useAppSelector(selectSettingsData);

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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
