import { useAnimation } from '@hooks';
import logo from '~assets/images/logo96.png';

function AppLoader() {
  const isAnimationEnabled = useAnimation();

  return (
    <div className="align-content-center text-center h-100">
      <img
        src={logo}
        alt="Logo"
        className={`${isAnimationEnabled ? 'animation-pulse' : ''}`}
      />
    </div>
  );
}

export { AppLoader };
