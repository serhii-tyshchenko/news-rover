import { DEFAULT_POSTS_LIMIT } from '@constants';
import { getClassName } from '@utils';
import { useAnimation } from '@hooks';

import './skeleton.scss';

function Skeleton() {
  const isAnimationEnabled = useAnimation();
  const className = getClassName('skeleton', {
    'skeleton--animated': isAnimationEnabled,
  });

  return (
    <ul className="d-flex flex-direction-column h-100 overflow-y-auto pr-1">
      {Array.from({ length: DEFAULT_POSTS_LIMIT }).map((_, index) => (
        <li className={className} key={index} />
      ))}
    </ul>
  );
}

export default Skeleton;
