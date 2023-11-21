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
    <ul>
      {Array.from({ length: DEFAULT_POSTS_LIMIT }).map((_, index) => (
        <li className={className} key={index} />
      ))}
    </ul>
  );
}

export default Skeleton;
