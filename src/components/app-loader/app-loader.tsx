import { useLocalization, useAnimation } from '@hooks';
import logo from '~assets/images/logo96.png';

function AppLoader() {
  const dic = useLocalization();
  const isAnimationEnabled = useAnimation();

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <img
        src={logo}
        alt={dic.loading}
        className={`${isAnimationEnabled ? 'animation-pulse' : ''}`}
      />
    </div>
  );
}

export { AppLoader };
