import logo from '~assets/images/logo96.png';

import { useAnimation } from '@hooks';

function AppLoader() {
  const isAnimationEnabled = useAnimation();

  return (
    <div className="content-center text-center h-full">
      <img
        src={logo}
        alt="Logo"
        className={`${isAnimationEnabled ? 'animation-pulse' : ''}`}
      />
    </div>
  );
}

export { AppLoader };
